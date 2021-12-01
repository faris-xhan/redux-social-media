import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  selectAllNotifications,
} from '../features/notifications/notificationsSlice';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifiactions = notifications.filter((n) => !n.read).length;
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  let unreadNotifiactions;
  if (numUnreadNotifiactions > 0) {
    unreadNotifiactions = (
      <span className="badge">{numUnreadNotifiactions}</span>
    );
  }

  return (
    <nav>
      <section>
        <h1 className="text-center">Butterfly 🦋</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {unreadNotifiactions}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};
