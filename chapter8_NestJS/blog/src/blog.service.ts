import { PostDto } from './blog.model';

export class BlogService {
    posts = [];

    getAllPosts() {
        return this.posts;
    }

    createPost(postDto: PostDto) {
        const id = this.posts.length + 1;
        this.posts.push({ id: id.toString(), ...postDto, createdDt: new Date() });
    }

    getPost(id) {
        const post = this.posts.find((post) => {
            return post.id === id;
        });
        console.log(post);
        return post;
    }

    delete(id) {
        const filteredPosts = this.posts.filter((post) => post.id !== id);
        this.posts = [...filteredPosts]; // destructuring assignment로 깊은 복사
    }

}