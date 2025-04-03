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





  // Calculator
  document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loanAmount = document.getElementById('loanAmount');
    const loanAmountInput = document.getElementById('loanAmountInput');
    const loanDuration = document.getElementById('loanDuration');
    const loanDurationInput = document.getElementById('loanDurationInput');
    const interestRate = document.getElementById('interestRate');
    const interestRateInput = document.getElementById('interestRateInput');
    const daysBtn = document.getElementById('daysBtn');
    const monthsBtn = document.getElementById('monthsBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalInterest = document.getElementById('totalInterest');
    const totalPayment = document.getElementById('totalPayment');
    const errorMsg = document.getElementById('errorMsg');
    const minDuration = document.getElementById('minDuration');
    const maxDuration = document.getElementById('maxDuration');

    // Default to days
    let isDays = true;

    // Sync range sliders with input fields
    loanAmount.addEventListener('input', () => {
      loanAmountInput.value = parseInt(loanAmount.value).toLocaleString();
    });

    loanAmountInput.addEventListener('input', () => {
      const value = parseInt(loanAmountInput.value.replace(/,/g, '')) || 0;
      loanAmount.value = Math.min(Math.max(value, 50000), 3000000);
      loanAmountInput.value = parseInt(loanAmount.value).toLocaleString();
    });

    loanDuration.addEventListener('input', () => {
      loanDurationInput.value = loanDuration.value;
    });

    loanDurationInput.addEventListener('input', () => {
      const value = parseInt(loanDurationInput.value) || 0;
      loanDuration.value = Math.min(Math.max(value, 30), 1095);
      loanDurationInput.value = loanDuration.value;
    });

    interestRate.addEventListener('input', () => {
      interestRateInput.value = interestRate.value;
    });

    interestRateInput.addEventListener('input', () => {
      const value = parseFloat(interestRateInput.value) || 0;
      interestRate.value = Math.min(Math.max(value, 5), 40);
      interestRateInput.value = interestRate.value;
    });

    // Toggle between days and months
    daysBtn.addEventListener('click', () => {
      if (!isDays) {
        isDays = true;
        daysBtn.classList.add('active', 'bg-[#366f9a]', 'text-white');
        daysBtn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        monthsBtn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        monthsBtn.classList.remove('active', 'bg-[#366f9a]', 'text-white');
        loanDuration.min = 30;
        loanDuration.max = 1095;
        minDuration.textContent = '30 Days';
        maxDuration.textContent = '36 Months';
        loanDuration.value = 180;
        loanDurationInput.value = 180;
      }
    });

    monthsBtn.addEventListener('click', () => {
      if (isDays) {
        isDays = false;
        monthsBtn.classList.add('active', 'bg-[#366f9a]', 'text-white');
        monthsBtn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        daysBtn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        daysBtn.classList.remove('active', 'bg-[#366f9a]', 'text-white');
        loanDuration.min = 1;
        loanDuration.max = 36;
        minDuration.textContent = '1 Month';
        maxDuration.textContent = '36 Months';
        loanDuration.value = 6;
        loanDurationInput.value = 6;
      }
    });

    // Calculate function
    function calculateLoan() {
      const amount = parseInt(loanAmount.value);
      let duration = parseInt(loanDuration.value);
      const rate = parseFloat(interestRate.value) / 100;
      
      if (isNaN(amount) || isNaN(duration) || isNaN(rate)) {
        errorMsg.classList.remove('hidden');
        return;
      }
      
      errorMsg.classList.add('hidden');
      
      // Convert days to months if in days mode
      if (isDays) {
        duration = duration / 30.4167; // Average days in month
      }
      
      // Monthly interest rate
      const monthlyRate = rate / 12;
      
      // Calculate monthly payment using EMI formula
      const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, duration) / 
                 (Math.pow(1 + monthlyRate, duration) - 1);
      
      const total = emi * duration;
      const interest = total - amount;
      
      // Update results
      monthlyPayment.textContent = '₦' + emi.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      totalInterest.textContent = '₦' + interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      totalPayment.textContent = '₦' + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Clear function
    function clearForm() {
      loanAmount.value = 500000;
      loanAmountInput.value = '500000';
      loanDuration.value = isDays ? 180 : 6;
      loanDurationInput.value = isDays ? 180 : 6;
      interestRate.value = 15;
      interestRateInput.value = 15;
      monthlyPayment.textContent = '₦0';
      totalInterest.textContent = '₦0';
      totalPayment.textContent = '₦0';
      errorMsg.classList.add('hidden');
    }

    // Event listeners
    calculateBtn.addEventListener('click', calculateLoan);
    clearBtn.addEventListener('click', clearForm);

    // Initialize
    loanAmountInput.value = parseInt(loanAmount.value).toLocaleString();
    loanDurationInput.value = loanDuration.value;
    interestRateInput.value = interestRate.value;
  });