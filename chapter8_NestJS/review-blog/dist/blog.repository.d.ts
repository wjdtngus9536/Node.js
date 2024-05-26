import { PostDto } from "./model";
export interface BlogRepository {
    getAllPosts(): Promise<PostDto[]>;
    getPost(id: string): Promise<PostDto>;
    createPost(postDto: PostDto): any;
    deletePost(id: string): any;
    updatePost(id: string, postDto: PostDto): any;
}
export declare class BlogFileRepository implements BlogRepository {
    FILE_NAME: string;
    getAllPosts(): Promise<PostDto[]>;
    getPost(id: string): Promise<PostDto>;
    createPost(postDto: PostDto): Promise<void>;
    deletePost(id: string): Promise<void>;
    updatePost(id: string, postDto: PostDto): Promise<void>;
}
