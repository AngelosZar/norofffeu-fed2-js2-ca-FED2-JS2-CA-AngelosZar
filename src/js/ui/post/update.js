import { grabUserInput } from '../../ui/post/create';
import { updatePost } from '../../api/post/update';

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
