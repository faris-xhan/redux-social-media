import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/Spinner';
import PostExcerpt from './PostExcerpt';
import { fetchPosts, selectPostIds } from './postsSlice';

const PostsList = (props) => {
  const dispatch = useDispatch();
  const orderedPosts = useSelector(selectPostIds);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post} postId={post} />
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }
  return (
    <section className="posts-list">
      <h1>Posts</h1>
      {content}
    </section>
  );
};

export default PostsList;
