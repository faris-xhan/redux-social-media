import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
const initialState = {
  status: 'idle',
  data: [],
  error: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.data = state.data.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.data;
export const selectPostById = (state, postId) =>
  state.posts.data.find((post) => post.id === postId);

export const { postAdded, postUpdated, reactionUpdated } = actions;
export default postsReducer;
