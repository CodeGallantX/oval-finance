// FAQ toggle function
function toggleFAQ(button) {
    const faqItem = button.closest('.border-b');
    const content = faqItem.querySelector('.faq-content');
    const plusIcon = faqItem.querySelector('.faq-plus');
    const minusIcon = faqItem.querySelector('.faq-minus');
    
    // Close all other FAQs
    document.querySelectorAll('.border-b').forEach(item => {
      if (item !== faqItem) {
        item.querySelector('.faq-content').classList.add('max-h-0');
        item.querySelector('.faq-plus').classList.remove('hidden');
        item.querySelector('.faq-minus').classList.add('hidden');
      }
    });
    
    // Toggle current FAQ
    if (content.classList.contains('max-h-0')) {
      content.classList.remove('max-h-0');
      content.classList.add('max-h-[500px]');
      plusIcon.classList.add('hidden');
      minusIcon.classList.remove('hidden');
    } else {
      content.classList.add('max-h-0');
      content.classList.remove('max-h-[500px]');
      plusIcon.classList.remove('hidden');
      minusIcon.classList.add('hidden');
    }
  }