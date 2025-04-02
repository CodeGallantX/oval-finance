document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeSidebarButton = document.getElementById('close-sidebar-button');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileSidebar = document.getElementById('mobile-sidebar');

    // Mobile dropdown elements
    const mobileProductsButton = document.getElementById('mobile-products-button');
    const mobileProductsDropdown = document.getElementById('mobile-products-dropdown');
    const mobileProductsIcon = document.getElementById('mobile-products-icon');
    
    const mobileAboutButton = document.getElementById('mobile-about-button');
    const mobileAboutDropdown = document.getElementById('mobile-about-dropdown');
    const mobileAboutIcon = document.getElementById('mobile-about-icon');

    // Toggle mobile sidebar with smooth transitions
    function toggleSidebar() {
      if (mobileSidebar.classList.contains('hidden')) {
        // Opening the sidebar
        mobileOverlay.classList.remove('hidden');
        mobileSidebar.classList.remove('hidden');
        
        // Force reflow to enable transitions
        void mobileOverlay.offsetWidth;
        void mobileSidebar.offsetWidth;
        
        mobileOverlay.classList.remove('opacity-0');
        mobileSidebar.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');
      } else {
        // Closing the sidebar
        mobileOverlay.classList.add('opacity-0');
        mobileSidebar.classList.add('translate-x-full');
        
        // Close all dropdowns when closing sidebar
        closeAllDropdowns();
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
          mobileOverlay.classList.add('hidden');
          mobileSidebar.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }, 300);
      }
    }

    function closeAllDropdowns() {
      document.querySelectorAll('[id$="-dropdown"]').forEach(dropdown => {
        dropdown.classList.add('hidden');
        dropdown.style.maxHeight = '0';
        const icon = dropdown.previousElementSibling.querySelector('i');
        if (icon) icon.classList.remove('rotate-90');
      });
    }

    mobileMenuButton.addEventListener('click', toggleSidebar);
    closeSidebarButton.addEventListener('click', toggleSidebar);
    mobileOverlay.addEventListener('click', toggleSidebar);

    // Toggle mobile dropdowns with smooth animation
    function toggleDropdown(button, dropdown, icon) {
      const isExpanded = !dropdown.classList.contains('hidden');
      
      // Close all other dropdowns first
      closeAllDropdowns();
      
      // Toggle current dropdown
      if (isExpanded) {
        dropdown.classList.add('hidden');
        dropdown.style.maxHeight = '0';
        icon.classList.remove('rotate-90');
      } else {
        dropdown.classList.remove('hidden');
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        icon.classList.add('rotate-90');
      }
    }

    mobileProductsButton.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(mobileProductsButton, mobileProductsDropdown, mobileProductsIcon);
    });

    mobileAboutButton.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown(mobileAboutButton, mobileAboutDropdown, mobileAboutIcon);
    });

    // Close sidebar when clicking on a link (except dropdown toggles)
    document.querySelectorAll('#mobile-sidebar a').forEach(link => {
      link.addEventListener('click', function(e) {
        if (!e.target.closest('button')) {
          toggleSidebar();
        }
      });
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !mobileSidebar.classList.contains('hidden')) {
        toggleSidebar();
      }
    });

    // Update dropdown heights when window resizes
    window.addEventListener('resize', function() {
      document.querySelectorAll('[id$="-dropdown"]').forEach(dropdown => {
        if (!dropdown.classList.contains('hidden')) {
          dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        }
      });
    });
  });