import { readPost, readPosts } from '../../api/post/read';
console.log('yo You are at Single Post Page');
// readPost(627);

const renderSinglePost = async function (id) {
  try {
    const responseData = await readPost(id);

    const parentContainer = document.querySelector('#single_post');
    const title = responseData.title;
    const body = responseData.body;
    const tags = responseData.tags.join(', ');
    const mediaUrl = responseData.media.url;
    const mediaAlt = responseData.media.alt;

    console.log(parentContainer);
    const html = ` 
          <div class="card-for-posts">
            <h3 class="title-for-post">${title}</h3>
            <p class="body-for-post">${body}</p>
            <p class="tags-for-post">${tags}</p>
            <img class="media-for-post" src="${mediaUrl}" alt="${mediaAlt}" />
          </div> `;
    parentContainer.insertAdjacentHTML('beforeend', html);
  } catch (error) {}
};
renderSinglePost(628);
readPosts(12, 1, 'tag');
