import { authGuard } from '../../utilities/authGuard';
import { readPosts } from '../../api/post/read';
import { readPost } from '../../api/post/read';
import { checkForCredentials } from '../../router/views/auth';
import { handleMoveToSingleView } from '../../router/views/helper.js';
// import { formatPostDate } from '../../router/views/helper.js';
// import { extractAuthorInfo } from '../../router/views/helper.js';
import { extractAuthorInfo, formatPostDate } from '../../router/views/helper';

authGuard();
//
const renderMultiplePosts = async function () {
  try {
    const responseData = await readPosts();

    if (!responseData) {
      throw new Error('No data found\nPlease try again later');
    }
    const parentContainer = document.querySelector('#homepage-post-feed');
    parentContainer.classList.add('container', 'mx-auto', 'max-w-[95%]', 'md:max-w-[85%]');

    responseData.forEach(async (post) => {
      const { name, email, bio, avatar, banner, avatarUrl, bannerUrl, avatarAlt } =
        extractAuthorInfo(post);
      const html = `
        <div class="container mx-auto max-w-[95%] md:max-w-[85%]" id="post-feed">
          <div class="card-for-posts mb-8 rounded-md border-2 border-slate-300 bg-slate-50 text-gray-600 dark:bg-gray-700 dark:text-white" data-post-id="${post.id}">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-[1fr_3fr]">
              <div class="flex w-full items-center gap-4 p-4 md:pl-6 ">
                <img
                  src="${avatarUrl}"
                  class="flex h-16 w-16 flex-shrink-0 rounded-full object-cover"
                  alt="${avatarAlt}"
                />
                <div class="flex flex-col">
                  <p id="userAvatarOnPost" class="">${name}</p>
                  <p id="timeOfPost" class="flex text-xs dark:text-gray-400">${formatPostDate(post.created)}</p>
                </div>
              </div>
         <div class="flex w-full flex-shrink flex-col md:pl-8 md:pt-2">
         <h3 class="title-for-post px-4 py-2 text-xl font-bold truncate hover:text-clip hover:whitespace-normal text-right">${post.title}</h3>
          <p class="body-for-post px-4 pb-2 dark:text-gray-400 text-right">${post?.body}</p>
           </div>
            </div>
            <div class="flex max-h-[36rem] max-w-[62rem] items-center justify-center overflow-hidden">
              <img
                class="media-for-post h-auto w-full object-contain object-center"
                src="${post?.media?.url ?? ''}"
                alt="${post?.media?.alt ?? ''}"
                data-post-id="${post.id}"
              />
            </div>
            <p class="tags-for-post py-4 pl-4">${post?.tags.join(' / ')}</p>
            <div class="flex justify-around pb-4 [&>a]:rounded-md [&>a]:px-4 [&>a]:py-2 [&>a]:transition-colors flex-wrap">
              <a href="#" id="like-btn" class="hover:bg-slate-300">Like 👍</a>
              <a href="#" id="comment-btn" class="hover:bg-slate-300">Comment 💬</a>
              <a href="#" id="share-btn" class="hover:bg-slate-300">Share ↪</a>
            </div>
          </div>
        </div>
      `;

      parentContainer.insertAdjacentHTML('beforeend', html);
      const postId = post.id;
      return postId;
    });
    parentContainer.addEventListener('click', handleMoveToSingleView);
  } catch (error) {
    alert(error);
    throw error;
  }
};

document.addEventListener('DOMcontentLoaded', checkForCredentials());
await renderMultiplePosts();
// await readPost(4396);
// await readPosts(12, 1, 'tag');

//
// </div>
//               <img
//                 src="${avatarUrl}"
//                 class="flex h-16 w-16 flex-shrink-0 rounded-full object-cover"
//             alt="${avatarAlt}"
//               />
//               <div class="flex flex-col">
//                 <p id="userAvatarOnPost" class="">${name}</p>
//                 <p id="timeOfPost" class="flex max-w-[80%] dark:text-gray-400">${formatPostDate(post.created)}</p>
//               </div>
//             </div>
//             <div class="flex w-full flex-shrink flex-col md:pl-2 md:pt-2">
//               <h3 class="title-for-post px-4 py-2 text-xl font-bold">${post.title}</h3>
//               <p class="body-for-post px-4 pb-2 dark:text-gray-400">${post?.body}</p>
//             </div>
//           </div>
//           <div class="flex max-h-[36rem] max-w-[62rem] items-center justify-center overflow-hidden">
//             <img
//               class="media-for-post h-auto w-full object-contain object-center"
//               src="${post?.media?.url ?? ''}"
//               alt="${post?.media?.alt ?? ''}"
//               data-post-id="${post.id}"
//             />
//           </div>
//           <p class="tags-for-post py-4 pl-4">${post?.tags.join(' / ')}</p>
//           <div class="flex justify-around pb-4 [&>a]:rounded-md [&>a]:px-4 [&>a]:py-2 [&>a]:transition-colors flex-wrap">
//             <a href="#" id="like-btn" class="hover:bg-slate-300">Like 👍</a>
//             <a href="#" id="comment-btn" class="hover:bg-slate-300">Comment 💬</a>
//             <a href="#" id="share-btn" class="hover:bg-slate-300">Share ↪</a>
//           </div>
//         </div>
//       </div>
