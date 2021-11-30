import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = {
  status: 'idle',
  data: [],
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.data;
});

const { reducer: usersReducer, actions } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
        state.error = 'There was an error getting users';
      });
  },
});

export const selectAllUsers = (state) => state.users.data;
export const selectUserById = (state, userId) =>
  state.users.data.find((user) => user.id === userId);

export default usersReducer;
