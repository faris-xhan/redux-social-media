import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    author: '',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text!',
    date: sub(new Date(), { minutes: 25 }).toISOString(),

    author: '',
  },
];
const { reducer: postsReducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.unshift(action.payload);
      },
      prepare: (data) => {
        const payload = { id: nanoid(), ...data };
        return { payload };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content, author } = action.payload;
      const post = state.find((post) => post.id === id);
      if (post) {
        post.title = title;
        post.content = content;
        post.author = author;
      }
    },
  },
});

export const { postAdded, postUpdated } = actions;
export default postsReducer;
