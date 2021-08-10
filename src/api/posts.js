import { request } from './api';

export function getPostsFromServer() {
  return request(`/posts`);
}

export function addNewPostToServer(newPost) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  return request(`/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newPost),
  });
}

export function editPostOnServer(postId, updatedPost) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  return request(`/posts/${postId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updatedPost),
  });
}

export function deletePostOnServer(postId) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  return request(`/posts/${postId}`, {
    method: 'DELETE',
    headers,
  });
}
