import { request } from './api';

export function getComments(postId) {
  return request(`/comments?postId=${postId}`);
}

export function addNewCommentToServer(newComment) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  return request(`/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newComment),
  });
}
