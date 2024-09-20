import { readPost, readPosts } from '../../api/post/read';

const renderSinglePost = async function (id) {
  try {
    const responseData = await readPost(id);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }

    const parentContainer = document.querySelector('#single_post');
    const html = ` 
          <div class="card-for-posts">
            <h3 class="title-for-post">${responseData.title}</h3>
            <p class="body-for-post">${responseData.body}</p>
            <p class="tags-for-post">${responseData.tags.join(' / ')}</p>
            <img class="media-for-post" src="${responseData.media.url}" alt="${
      responseData.media.alt
    }" />
          </div> `;
    parentContainer.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    alert(error);
    throw error;
  }
};

//
const renderMultiplePosts = async function (limit, page, tag) {
  try {
    const responseData = await readPosts(limit, page, tag);

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }

    const parentContainer = document.querySelector('#many_posts');
    responseData.forEach(post => {
      const html = `
          <div class="card-for-posts">
            <h3 class="title-for-post">${post.title}</h3>
            <p class="body-for-post">${post.body}</p>
            <p class="tags-for-post">${post.tags.join(' / ')}</p>
            <img class="media-for-post" src="${post?.media?.url ?? ''}" alt="${
        post?.media?.alt ?? ''
      }" />
          </div>`;
      parentContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    alert(error);
    throw error;
  }
};

await renderMultiplePosts(12, 1, 'tag');
await renderSinglePost(628);
