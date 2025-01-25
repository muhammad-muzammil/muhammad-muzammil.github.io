document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    button.addEventListener('click', function () {
      if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
        dropdownContent.style.display = 'block'; // Show citation
        this.textContent = 'Hide Citation'; // Update button text
      } else {
        dropdownContent.style.display = 'none'; // Hide citation
        this.textContent = 'Show Citation'; // Update button text
      }
    });
  });