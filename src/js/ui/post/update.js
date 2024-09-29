import { grabUserInput } from '../../ui/post/create';
import { updatePost } from '../../api/post/update';
import { readPost } from '../../api/post/read';
import { generateHtml } from '../../router/views/helper';

export async function onUpdatePost(event) {
  event.preventDefault();
  const form = event.target;
  const id = localStorage.getItem('postID');
  const userInput = grabUserInput(event);
  try {
    const res = await updatePost(id, userInput);
    console.log(res);
    if (!res) {
      throw new Error('Update post failed');
    }
    if (res) {
      form.reset();
      alert('Post was updated successfully  ');
    }
  } catch (error) {
    alert(`An error occurred: ${error.message}`);
    throw error;
  }
}
const displayEditingPost = async function () {
  const id = localStorage.getItem('postID');
  const post = await readPost(id);
  const parentContainer = document.querySelector('#current-post-on-edit');
  generateHtml('current-post-on-edit', [post]);
  console.log(parentContainer);
  console.log(id);
  console.log(post);
};
displayEditingPost();
