import { readPost, readPosts } from '../../api/post/read';
console.log('yo You are at Single Post Page');
// readPost(627);

const renderSinglePost = async function (id) {
  try {
    const responseData = await readPost(id);

    const parentContainer = document.querySelector('#single_post');
    const title = responseData.title;
    const body = responseData.body;
    const tags = responseData.tags.join(' / ');
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
//
const renderMultiplePosts = async function (limit, page, tag) {
  try {
    const responseData = await readPosts(limit, page, tag);
    const parentContainer = document.querySelector('#many_posts');
    console.log('yo You are at Multiple Post Page');
    console.log(parentContainer);
    console.log(responseData);
    responseData.forEach(post => {
      const title = post.title;
      const body = post.body;
      const tags = post.tags.join(' / ');
      const mediaUrl = post?.media?.url ?? '';
      const mediaAlt = post?.media?.alt ?? '';
      console.log('title', title);
      const html = `
          <div class="card-for-posts">
            <h3 class="title-for-post">${title}</h3>
            <p class="body-for-post">${body}</p>
            <p class="tags-for-post">${tags}</p>
            <img class="media-for-post" src="${mediaUrl}" alt="${mediaAlt}" />
          </div>`;
      parentContainer.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {}
};
// readPosts(12, 1, 'tag');
renderMultiplePosts(12, 1, 'tag');

// const title = post.title;
// const body = post.body;
// const tags = post.tags.join(' / ');
// const mediaUrl = post.media.url;
// const mediaAlt = post.media.alt;
// console.log('yo You are at Multiple Post Page');
// console.log(post);
// console.log(title);
