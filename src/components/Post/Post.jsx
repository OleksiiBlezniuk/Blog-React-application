import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CommentsList } from '../CommentsList/CommentsList';
import { editPostOnServer, deletePostOnServer } from '../../api/posts';

import './Post.scss';

export function Post({ post, getPosts }) {
  const [postTitle, setPostTitle] = useState(post.title);
  const [postBody, setPostBody] = useState(post.body);
  const [postTitleError, setPostTitleError] = useState(false);
  const [postBodyError, setPostBodyError] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const changeTitle = ({ target }) => {
    const { value } = target;

    setPostTitle(value);
    setPostTitleError(false);
  };

  const changeBody = ({ target }) => {
    const { value } = target;

    setPostBody(value);
    setPostBodyError(false);
  };

  const editPost = (event) => {
    event.preventDefault();

    if (!postTitle) {
      setPostTitleError(true);
    }

    if (!postBody) {
      setPostBodyError(true);
    }

    if (!postTitle || !postBody) {
      return;
    }

    const updatedPost = {
      title: postTitle,
      body: postBody,
    };

    editPostOnServer(post.id, updatedPost)
      .then(() => {
        setPostTitle(post.title);
        setPostBody(post.body);
        setIsEditFormVisible(false);
        getPosts();
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <h3 className="post__title">
          {post.title}
        </h3>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setIsEditFormVisible(true)}
          >
            Edit post
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deletePostOnServer(post.id)
                .then(() => getPosts());
            }}
          >
            Delete post
          </button>
        </div>
      </div>
      <div className="post__body">
        <p className="post__content">
          {post.body}
        </p>
        {isEditFormVisible && (
          <form
            className="post__form"
            onSubmit={editPost}
          >
            <label className="form-label">
              Edit title:
              <input
                type="text"
                value={postTitle}
                onChange={changeTitle}
                className="form-control"
              />
              <p className={classNames('error-message', {
                'error-message--visible': postTitleError,
              })}
              >
                Please enter title of your post
              </p>
            </label>
            <label className="form-label">
              Edit text:
              <textarea
                type="text"
                value={postBody}
                onChange={changeBody}
                className="form-control post__text-input"
              />
              <p className={classNames('error-message', {
                'error-message--visible': postBodyError,
              })}
              >
                Please enter text of your post
              </p>
            </label>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit changes
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setIsEditFormVisible(false);
                setPostTitle(post.title);
                setPostBody(post.body);
                setPostTitleError(false);
                setPostBodyError(false);
              }}
            >
              Cancel
            </button>
          </form>
        )}
        <CommentsList postId={post.id} />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  getPosts: PropTypes.func.isRequired,
};
