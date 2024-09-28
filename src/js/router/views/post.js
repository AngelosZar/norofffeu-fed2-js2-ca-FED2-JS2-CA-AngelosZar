import { readPost, readPosts } from '../../api/post/read';
import { deletePost } from '../../api/post/delete';
import { handleDeletingPost } from '../../router/views/helper';
import { handleEditPost } from '../../router/views/helper';
import { handleMoveToSingleView } from '../../router/views/helper';
import { generateHtml } from '../../router/views/helper.js';

const renderSinglePost = async function (id, container = 'single_post') {
  try {
    const post = await readPost(id);

    if (!post) {
      throw new Error('No data found\nPlease try again later');
    }
    generateHtml(container, [post]);
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const renderMultiplePosts = async function (limit, page, tag) {
  try {
    const responseData = await readPosts(limit, page, tag);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }
    await generateHtml('many_posts', responseData);
  } catch (error) {
    alert(error);
    throw error;
  }
};

// await renderMultiplePosts(12, 1, 'tag');
// await renderSinglePost(1072);
const main = async function () {
  const id = localStorage.getItem('postID');
  console.log(id);
  await renderMultiplePosts(12, 1, 'tag');
  await renderSinglePost(id);
};
main();
