import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';

import { postUpdated, selectPostById } from './postsSlice';

const defaultFormData = {
  title: '',
  content: '',
  user: '',
};
export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => selectPostById(state, postId));

  const [formData, setFormData] = useState(post);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const canSave = Boolean(formData.title) && Boolean(formData.content);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postUpdated(formData));
    setFormData(defaultFormData);
    history.push(`/posts/${formData.id}`);
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          placeholder="What's on your mind?"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
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
