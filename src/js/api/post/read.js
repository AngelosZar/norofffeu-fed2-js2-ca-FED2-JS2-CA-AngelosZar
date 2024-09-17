import { API_SOCIAL } from './constants';
import { API_SOCIAL_POSTS } from './constants';
import { API_SOCIAL_PROFILES } from './constants';
//
export async function readPost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
