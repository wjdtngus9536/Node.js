import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogController {
    // blogService: BlogService;
    
    constructor(private blogService : BlogService) {
        // this.blogService = new BlogService(); // NestJS에서는 의존성 주입을 주로 사용, 아직 배우지 않았으므로 생성자를 사용
    }

    @Get()
    async getAllPosts() {
        console.log(`모든 게시글 가져오기`);
        return await this.blogService.getAllPosts();
    }

    @Post()
    createPost(@Body() postDto) {
        console.log(`게시글 작성`);
        this.blogService.createPost(postDto);
        return `success`;
    }

    @Get('/:id')
    // 비동기를 지원하는 메서드 시그니처로 변경
    async getPost(@Param('id') id: string) {
        console.log(`게시글 하나 가져오기`);

        // 블로그 서비스에서 사용하는 메서드가 비동기로 변경되었으므로 await 사용
        const post = await this.blogService.getPost(id);
        console.log(post);
        
        return post;
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log(`게시글 삭제`);
        this.blogService.deletePost(id);
        return `success`;
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto) {
        console.log(`게시글 업데이트`, id, postDto);
        return this.blogService.updatePost(id, postDto);
    }

}