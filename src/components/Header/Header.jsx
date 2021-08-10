import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NewPost } from '../NewPost';

import './Header.scss';

export function Header({ getPosts }) {
  const [isNewPostFormVisible, setIsNewPostFormVisible] = useState(false);

  return (
    <header className="App__header header">
      <h1 className="header__title">
        Blog React Application
      </h1>

      <div className="header__content">
        {!isNewPostFormVisible && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsNewPostFormVisible(true)}
          >
            Create new post
          </button>
        )}

        {isNewPostFormVisible
          && (
          <NewPost
            setIsNewPostFormVisible={setIsNewPostFormVisible}
            getPosts={getPosts}
          />
          )
        }
      </div>
    </header>
  );
}

Header.propTypes = {
  getPosts: PropTypes.func.isRequired,
};
