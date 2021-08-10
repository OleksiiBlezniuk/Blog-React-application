import React from 'react';
import PropTypes from 'prop-types';

import { Post } from '../Post/Post';

import './PostsList.scss';

export const PostsList = ({ posts, getPosts }) => (
  <div className="PostsList">
    <h2 className="PostList__title">
      Posts:
    </h2>

    <ul className="list-group">
      {posts.map(post => (
        <li key={post.id} className="list-group-item post">
          <Post post={post} getPosts={getPosts} />
        </li>
      ))}
    </ul>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  getPosts: PropTypes.func.isRequired,
};
