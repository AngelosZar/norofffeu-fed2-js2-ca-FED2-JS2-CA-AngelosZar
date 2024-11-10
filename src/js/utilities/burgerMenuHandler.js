export function initNavigationMenu() {
  const hamburgerBtn = document.querySelector('#hamburger-btn');
  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileMenuCloseBtn = document.querySelector('#mobile-close-btn');

  // toggle menu
  function toggleMobileMenu() {
    console.log('click');
    const isMobileMenuHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', !isMobileMenuHidden);
    document.body.style.overflow = isMobileMenuHidden ? 'hidden' : '';
    hamburgerBtn.setAttribute('aria-expanded', isMobileMenuHidden ? 'true' : 'false');
  }
  hamburgerBtn.addEventListener('click', toggleMobileMenu);
  mobileMenu.addEventListener('click', toggleMobileMenu);
}
