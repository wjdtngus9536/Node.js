import { BlogService } from "./blog.service";
import { PostDto } from "./model";
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    getAllPosts(): Promise<PostDto[]>;
    createPost(post: PostDto): string;
    getPost(id: string): Promise<PostDto>;
    deletePost(id: string): string;
    updatePost(id: string, post: PostDto): void;
}
