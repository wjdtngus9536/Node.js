import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Blog, BlogDocument } from "./blog.schema";
import { Injectable } from "@nestjs/common";
import { PostDto } from "./blog.model";
import { writeFile, readFile } from "fs/promises"; // 1. 파일을 읽고 쓰는 모듈 import

interface BlogRepository {
    getAllPosts(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: string): Promise<PostDto>;
    deletePost(id: string);
    updatePost(id: string, postDto: PostDto);
}

export { BlogRepository };

// 1. 몽고디비용 리포지토리
@Injectable()
export class BlogMongoRepository implements BlogRepository{
    // FILE_NAME = './src/blog.data.json';
    // 2. Model<BlogDocument> 타입인 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>){}
    
    async getAllPosts(): Promise<PostDto[]> {
        return await this.blogModel.find().exec();
    }

    async getPost(id: string): Promise<PostDto> {
        return await this.blogModel.findById(id);
    }

    async createPost(postDto: PostDto) {
        const createPost = {
            ...postDto,
            createdDt: new Date(),
            updatedDt: new Date(),
        };
        this.blogModel.create(createPost);
    }
    
    async deletePost(id: string) {
        await this.blogModel.findByIdAndDelete(id);
    }

    async updatePost(id: string, postDto: PostDto) {
        const updatePost = {
            ...postDto, 
            updatedDt: new Date(),
        }
        await this.blogModel.findByIdAndUpdate(id, updatePost);
    }
         
}