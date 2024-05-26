import { Injectable } from "@nestjs/common";
import { PostDto } from "./blog.model";
import { BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
    // posts = [];
    // blogRepository: BlogRepository; // BlogRepository = interface(객체 속성의 자료형까지 정의된 객체의 자료형) 명칭

    // constructor() {
    //     this.blogRepository = new BlogFileRepository();
    // }

    constructor(private blogRepository: BlogMongoRepository){
        
    }

    async getAllPosts() {
        return await this.blogRepository.getAllPosts();
    }

    createPost(postDto: PostDto) {
        this.blogRepository.createPost(postDto);
    }

    async getPost(id) {
        return await this.blogRepository.getAllPosts();
    }

    deletePost(id) {
        this.blogRepository.deletePost(id);
    }

    updatePost(id, postDto: PostDto) {
        this.blogRepository.updatePost(id, postDto);
    }
}