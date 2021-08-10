export const BASE_URL = 'https://bloggy-api.herokuapp.com';

export function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
}
