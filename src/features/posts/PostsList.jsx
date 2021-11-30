import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';

const PostsList = (props) => {
  const posts = useSelector((state) => state.posts);
  const redenredPosts = posts.map((post) => (
    <article key={post.id} className="post-excerpt">
      <h1>{post.title.substring(0, 100)}</h1>
      <p>{post.content}</p>
      <div>
        <PostAuthor userId={post.author} />
        <TimeAgo timestamp={post.date} />
      </div>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h1>Posts</h1>
      {redenredPosts}
    </section>
  );
};

export default PostsList;
