import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { postAdded } from './postsSlice';

const defaultFormData = {
  title: '',
  content: '',
  author: '',
};

const AddPostForm = (props) => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title && formData.content) {
      dispatch(postAdded(formData));
      setFormData(defaultFormData);
    }
  };

  const canSave = Boolean(formData.title) && Boolean(formData.content);

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
          name="author"
          value={formData.author}
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
