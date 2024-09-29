// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information

export const API_KEY =
  localStorage.getItem('apiKey') || '58881765-2f22-43fb-9ff2-88d8bbd8a470';

export const API_BASE = 'https://v2.api.noroff.dev';

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const API_SOCIAL_PROFILES_FOLLOW = `${API_BASE}/social/profiles/{name}/follow`;

export const API_SOCIAL_PROFILES_UNFOLLOW = `${API_BASE}/social/profiles/{name}/unfollow`;

export const API_SOCIAL_PROFILES_POSTS = `${API_BASE}/social/profiles/{name}/posts`;

export const API_SOCIAL_POSTS_REACT = `${API_BASE}/social/posts/{id}/react/{symbol}`;

export const API_SOCIAL_POSTS_COMMENT = `${API_BASE}/social/posts/{id}/comment`;

export const API_SOCIAL_POSTS_DELETE_COMMENT = `${API_BASE}/social/posts/{id}/comment/{commentId}`;
