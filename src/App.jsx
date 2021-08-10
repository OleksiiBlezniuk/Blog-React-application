import React, { useEffect, useState } from 'react';

import { PostsList } from './components/PostsList';
import { getPostsFromServer } from './api/posts';
import { Loader } from './components/Loader';
import { Header } from './components/Header';

import './App.scss';

export function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    setIsLoading(true);

    getPostsFromServer()
      .then(setPosts)
      .then(() => {
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <Header getPosts={getPosts} />

      <main className="App__main">
        {isError && (
          <h2 className="error-title">
            An error occurred while loading data
          </h2>
        )}
        {isLoading ? (
          <Loader />
        ) : isError || (
          <PostsList posts={posts} getPosts={getPosts} />
        )}
      </main>
    </div>
  );
}
