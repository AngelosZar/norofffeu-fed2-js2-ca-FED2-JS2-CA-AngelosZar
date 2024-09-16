export function setLogoutListener() {
  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      alert('You are now logged out');
      localStorage.clear();
      window.location.href = '/auth/login/';
    });
  } else {
    return;
  }
}
