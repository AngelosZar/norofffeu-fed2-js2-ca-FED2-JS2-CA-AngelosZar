export function setLogoutListener() {
  console.log('connected listener');
  const logoutButton = document.getElementById('logout-btn');
  console.log(logoutButton);
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      console.log('clicked');
      localStorage.clear();
      window.location.href = '/auth/login/';
    });
  }
}
