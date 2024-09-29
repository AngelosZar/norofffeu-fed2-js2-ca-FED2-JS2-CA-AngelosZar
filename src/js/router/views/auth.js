export function checkForCredentials() {
  const accessToken = localStorage.getItem('accessToken');
  const apiKey = localStorage.getItem('apiKey');
  if (!accessToken || !apiKey) {
    // console.log('There is no access token or api key');
    //    overlay to hide the page
  }
  if (accessToken || apiKey) {
    // console.log('accessToken', accessToken, 'apiKey', apiKey);
    //    show post feed
  }
}
