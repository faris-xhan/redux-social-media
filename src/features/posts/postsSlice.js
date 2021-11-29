import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'First Post', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text!' },
];
const { reducer: postsReducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.unshift(action.payload);
    },
  },
});

export const { postAdded } = actions;
export default postsReducer;
