import { PostDto } from "./blog.model";
import { BlogMongoRepository } from "./blog.repository";
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: BlogMongoRepository);
    getAllPosts(): Promise<PostDto[]>;
    createPost(postDto: PostDto): void;
    getPost(id: any): Promise<PostDto[]>;
    deletePost(id: any): void;
    updatePost(id: any, postDto: PostDto): void;
}
