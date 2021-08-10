import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { addNewPostToServer } from '../../api/posts';

import './NewPost.scss';

export function NewPost({ setIsNewPostFormVisible, getPosts }) {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!postTitle) {
      setTitleError(true);
    }

    if (!postBody) {
      setBodyError(true);
    }

    if (!postTitle || !postBody) {
      return;
    }

    const newPost = {
      title: postTitle,
      body: postBody,
    };

    addNewPostToServer(newPost)
      .then(() => {
        getPosts();
        setPostTitle('');
        setPostBody('');
        setIsNewPostFormVisible('false');
      });
  };

  const changeTitle = ({ target }) => {
    setPostTitle(target.value);
    setTitleError(false);
  };

  const changeBody = ({ target }) => {
    setPostBody(target.value);
    setBodyError(false);
  };

  return (
    <div className="new-post">
      <form
        id="new-post-form"
        className="new-post__form"
        onSubmit={handleSubmit}
      >
        <label className="form-label">
          Post title:
          <input
            type="text"
            value={postTitle}
            onChange={changeTitle}
            placeholder="Type post title here"
            className="form-control"
          />
          <p className={classNames('error-message', {
            'error-message--visible': titleError,
          })}
          >
            Please enter title of your post
          </p>
        </label>

        <label>
          Post text:
          <textarea
            value={postBody}
            onChange={changeBody}
            placeholder="Type post text here"
            className="form-control"
          />
          <p className={classNames('error-message', {
            'error-message--visible': bodyError,
          })}
          >
            Please enter text of your post
          </p>
        </label>
      </form>
      <div className="new-post__buttons">
        <button
          type="submit"
          form="new-post-form"
          className="btn btn-primary"
        >
          Save post
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setIsNewPostFormVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

NewPost.propTypes = {
  setIsNewPostFormVisible: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};
