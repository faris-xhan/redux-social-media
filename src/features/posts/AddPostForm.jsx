import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { postAdded } from './postsSlice';

const defaultFormData = {
  title: '',
  content: '',
};

const AddPostForm = (props) => {
  const dispatch = useDispatch();

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
      dispatch(
        postAdded({
          id: nanoid(),
          ...formData,
        })
      );
      setFormData(defaultFormData);
    }
  };
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
        <button type="submit">Save Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
