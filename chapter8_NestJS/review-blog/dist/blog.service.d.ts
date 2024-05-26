import { PostDto } from "./model";
import { BlogFileRepository } from "./blog.repository";
export declare class BlogService {
    private blogRepository;
    constructor(blogRepository: BlogFileRepository);
    getAllPosts(): Promise<PostDto[]>;
    createPost(postDto: PostDto): void;
    getPost(id: string): Promise<PostDto>;
    deletePost(id: string): void;
    updatePost(id: string, postDto: PostDto): void;
}
