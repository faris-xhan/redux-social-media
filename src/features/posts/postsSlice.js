import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  data: [],
  error: [],
};
const { reducer: postsReducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.data.unshift(action.payload);
      },
      prepare: (data) => {
        const payload = {
          id: nanoid(),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
          ...data,
        };
        return { payload };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content, author } = action.payload;
      const post = state.data.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
        post.author = author;
      }
    },
    reactionUpdated: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.data.find((post) => post.id === postId);
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts.data;
export const selectPostById = (state, postId) =>
  state.posts.data.find((post) => post.id === postId);

export const { postAdded, postUpdated, reactionUpdated } = actions;
export default postsReducer;
