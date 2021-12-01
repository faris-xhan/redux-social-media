import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPosts',
  async (data) => {
    const response = await client.post('/fakeApi/posts', data);
    return response.data;
  }
);

const { reducer: postsReducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content, author } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.author = author;
      }
    },
    reactionUpdated: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
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
        postAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addNewPost.fulfilled, postAdapter.addOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors((state) => state.posts);
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.id === userId)
);

export const { postUpdated, reactionUpdated } = actions;
export default postsReducer;
