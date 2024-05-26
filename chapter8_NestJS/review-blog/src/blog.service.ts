import { PostDto } from "./model";
import { BlogFileRepository } from "./blog.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogService {
    // posts = [];

    constructor(private blogRepository: BlogFileRepository) {}

    getAllPosts() {
        return this.blogRepository.getAllPosts();
    }

    createPost(postDto: PostDto) {
        this.blogRepository.createPost(postDto);
    }

    getPost(id: string) {
        return this.blogRepository.getPost(id);
    }

    deletePost(id: string) {
        this.blogRepository.deletePost(id);
    }

    updatePost(id: string, postDto: PostDto){
        this.blogRepository.updatePost(id, postDto);
    }
}