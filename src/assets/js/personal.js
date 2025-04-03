// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileSidebar = document.getElementById('mobile-sidebar');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeSidebarButton = document.getElementById('close-sidebar-button');

mobileMenuButton.addEventListener('click', () => {
  mobileSidebar.classList.remove('hidden');
  mobileSidebar.classList.remove('translate-x-full');
  mobileOverlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
});

closeSidebarButton.addEventListener('click', () => {
  mobileSidebar.classList.add('translate-x-full');
  mobileOverlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
});

mobileOverlay.addEventListener('click', () => {
  mobileSidebar.classList.add('translate-x-full');
  mobileOverlay.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
});

// Mobile dropdown toggles
const mobileProductsButton = document.getElementById('mobile-products-button');
const mobileProductsDropdown = document.getElementById('mobile-products-dropdown');
const mobileProductsIcon = document.getElementById('mobile-products-icon');

const mobileAboutButton = document.getElementById('mobile-about-button');
const mobileAboutDropdown = document.getElementById('mobile-about-dropdown');
const mobileAboutIcon = document.getElementById('mobile-about-icon');

mobileProductsButton.addEventListener('click', () => {
  mobileProductsDropdown.classList.toggle('hidden');
  mobileProductsDropdown.classList.toggle('max-h-0');
  mobileProductsIcon.classList.toggle('rotate-180');
});

mobileAboutButton.addEventListener('click', () => {
  mobileAboutDropdown.classList.toggle('hidden');
  mobileAboutDropdown.classList.toggle('max-h-0');
  mobileAboutIcon.classList.toggle('rotate-180');
});

// FAQ toggle function
function toggleFAQ(button) {
  const faqItem = button.closest('.border');
  const content = faqItem.querySelector('.faq-content');
  const icon = button.querySelector('i');
  
  // Toggle icon
  if (icon.classList.contains('bi-plus-lg')) {
    icon.classList.remove('bi-plus-lg');
    icon.classList.add('bi-dash-lg');
  } else {
    icon.classList.remove('bi-dash-lg');
    icon.classList.add('bi-plus-lg');
  }
  
  // Toggle content
  if (content.classList.contains('max-h-0')) {
    content.classList.remove('max-h-0');
    content.classList.add('max-h-[500px]', 'pb-6');
  } else {
    content.classList.add('max-h-0');
    content.classList.remove('max-h-[500px]', 'pb-6');
  }
}