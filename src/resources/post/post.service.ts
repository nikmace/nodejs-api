import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

export default class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */
    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (e) {
            console.log(e)
            throw new Error('Unable to create post');
        }
    }
}
