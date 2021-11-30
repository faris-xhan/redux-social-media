import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionUpdated } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        onClick={() =>
          dispatch(reactionUpdated({ postId: post.id, reaction: name }))
        }
        type="button"
        className="muted-button reaction-button"
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
