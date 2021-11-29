import { useSelector } from 'react-redux';

const PostsList = (props) => {
  const posts = useSelector((state) => state.posts);
  const redenredPosts = posts.map((post) => (
    <article key={posts.id} className="post-excerpt">
      <h1>{post.title.substring(0, 100)}</h1>
      <p>{post.content}</p>
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
