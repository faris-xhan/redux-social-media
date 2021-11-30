import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 2,
      hooray: 2,
      heart: 23,
      rocket: 0,
      eyes: 21,
    },
    author: '',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text!',
    date: sub(new Date(), { minutes: 25 }).toISOString(),
    reactions: {
      thumbsUp: 2,
      hooray: 0,
      heart: 1,
      rocket: 0,
      eyes: 2,
    },

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
    reactionUpdated: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionUpdated } = actions;
export default postsReducer;
