import http from "./http.js";

const getPosts = (callback) => {
  http.get('/posts')
      .then(response => callback(null, response))
      .catch(error => callback(error));
};

const getPostById = (id, callback) => {
  http.get(`/posts/${id}`)
      .then(response => callback(null, response))
      .catch(error => callback(error));
};

const createPost = (data, callback) => {
  http.post('/posts', data)
      .then(response => callback(null, response))
      .catch(error => callback(error));
};

const updatePost = (id, data, callback) => {
  http.put(`/posts/${id}`, data)
      .then(response => callback(null, response))
      .catch(error => callback(error));
};

const deletePost = (id, callback) => {
  http.delete(`/posts/${id}`)
      .then(response => callback(null, response))
      .catch(error => callback(error));
};

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};