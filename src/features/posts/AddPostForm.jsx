import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { addNewPost } from './postsSlice';

const defaultFormData = {
  title: '',
  content: '',
  user: '',
};

const AddPostForm = (props) => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const [formData, setFormData] = useState(defaultFormData);
  const [addRequestStatus, setAddRequestsStatus] = useState('idle');

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const canSave =
    Boolean(formData.user) &&
    Boolean(formData.title) &&
    Boolean(formData.content) &&
    addRequestStatus === 'idle';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (canSave) {
      try {
        setAddRequestsStatus('pending');
        await dispatch(addNewPost(formData)).unwrap();
        setFormData(defaultFormData);
      } catch (error) {
        console.log('Failed to save the post', error);
      } finally {
        setAddRequestsStatus('idle');
      }
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Post Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="What's on you're mind?"
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="user"
          value={formData.user}
          onChange={handleInputChange}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
