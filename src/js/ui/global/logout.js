export function setLogoutListener() {
  const logoutButtons = document.querySelectorAll('.logout-btn');

  if (logoutButtons.length > 0) {
    logoutButtons.forEach((button) => {
      button.addEventListener('click', () => {
        alert('You are now logged out');
        localStorage.clear();
        window.location.href = '/auth/login/';
      });
    });
  } else {
    return;
  }
}
// add .logout-btn' class on all pages
