import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./model";
import { Injectable } from "@nestjs/common";

export interface BlogRepository {
    getAllPosts(): Promise<PostDto[]>;
    getPost(id: string): Promise<PostDto>;
    createPost(postDto: PostDto);
    deletePost(id: string);
    updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository{
    FILE_NAME = './src/blog.data.json';

    async getAllPosts(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);
        return posts;
    }

    async getPost(id: string): Promise<PostDto> {
        const posts = await this.getAllPosts();
        const result = posts.find((post) => post.id === id);
        return result;
    }

    async createPost(postDto: PostDto) {
        const posts = await this.getAllPosts();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    async deletePost(id: string) {
        const posts = await this.getAllPosts();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    async updatePost(id: string, postDto: PostDto) {
        const posts = await this.getAllPosts();
        const updatePost = { id, ...postDto, updatedDt: new Date() };
        const index = posts.findIndex((post) => post.id === id);
        posts[index] = updatePost;
        await writeFile(this.FILE_NAME, JSON.stringify(posts));       
    }
}