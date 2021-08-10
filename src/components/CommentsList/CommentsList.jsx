import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getComments, addNewCommentToServer } from '../../api/comments';

export function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const addComment = (event) => {
    event.preventDefault();

    if (!newCommentText) {
      return;
    }

    const newComment = {
      postId,
      body: newCommentText,
    };

    addNewCommentToServer(newComment)
      .then(() => getComments(postId))
      .then(setComments);

    setNewCommentText('');
  };

  const handleChange = ({ target }) => {
    const { value } = target;

    setNewCommentText(value);
  };

  useEffect(() => {
    getComments(postId)
      .then(setComments);
  }, [postId]);

  return (
    <div className="post__comments">
      <h4>Comments:</h4>
      <ul className="list-group">
        {comments.length ? comments.map(comment => (
          <li className="list-group-item" key={comment.id}>
            {comment.body}
          </li>
        )) : (
          <p className="post__comments-error">
            <em>There is no comments yet</em>
          </p>
        )
      }
      </ul>
      <form
        className="post__comments-form"
        onSubmit={addComment}
      >
        <label className="form-label">
          Your comment:&nbsp;
          <textarea
            className="form-control"
            placeholder="Type your comment here"
            value={newCommentText}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary post__comment-button"
        >
          Add new comment
        </button>
      </form>
    </div>
  );
}

CommentsList.propTypes = {
  postId: PropTypes.number.isRequired,
};
