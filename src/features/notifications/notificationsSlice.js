import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { client } from '../../api/client';

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = notificationsAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.data;
  }
);

const { reducer: notificationReducer, actions } = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead: (state, action) => {
      Object.entries(state.entities).forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload);
      Object.entries(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      });
    },
  },
});

export default notificationReducer;
export const { allNotificationsRead } = actions;

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications);
