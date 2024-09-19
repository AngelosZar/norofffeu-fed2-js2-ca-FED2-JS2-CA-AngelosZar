import { createPost } from '../../api/post/create';

const grabUserInput = function (event) {
  event.preventDefault();
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const tags = form.tags.value.split(',') || [];
  const mediaAlt = form.media_alt.value || '';
  const mediaUrl = form.media_url.value || null;
  const userInput = {
    title: title,
    body: body,
    tags: tags,
    ...(mediaUrl && { media: { alt: mediaAlt, url: mediaUrl } }),
  };
  return userInput;
};

export async function onCreatePost(event) {
  event.preventDefault();
  try {
    const userInput = grabUserInput(event);
    const createdPost = await createPost({ userInput });
  } catch (error) {
    alert(`An error occurred: ${error.message}`);
    throw error;
  }
}
