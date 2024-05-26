import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { PostDto } from "./model";

@Controller('blog')
export class BlogController {
    // BlogService 인스턴스 생성
    // blogService : BlogService;
    constructor(private blogService: BlogService) {
        // this.blogService = new BlogService();
    }

    @Get()
    getAllPosts() {
        console.log(`모든 게시글 가져오기`);
        return this.blogService.getAllPosts();
    }

    @Post()
    createPost(@Body() post: PostDto) {
        console.log(`게시글 작성`);
        this.blogService.createPost(post);
        return `success`
    }

    @Get('/:id')
    getPost(@Param('id') id: string) {
        console.log(`게시글 하나 가져오기`);
        return this.blogService.getPost(id);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log(`[id: ${id}] 게시글 삭제`);
        this.blogService.deletePost(id);
        return `success`
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() post: PostDto) {
        console.log(`[id: ${id}] 게시글 업데이트`, id, post);
        return this.blogService.updatePost(id, post);
    }

}