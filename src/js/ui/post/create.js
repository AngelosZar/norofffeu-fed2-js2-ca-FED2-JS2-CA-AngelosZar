import { createPost } from '../../api/post/create';
const title = 'A random title for test';
const body = 'also somethinfg very random like bhsdfgbdskfbgkdsh';
const tags = 'random';
const media = '';
export async function onCreatePost(event) {
  event.preventDefault();
  console.log('gfhfh');
  await createPost({ title, body, tags, media });
}
