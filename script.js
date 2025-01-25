document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.dropdown-btn');
  
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const dropdownContent = this.nextElementSibling;
  
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none'; // Hide citation
          this.textContent = 'Show Citation'; // Update button text
        } else {
          dropdownContent.style.display = 'block'; // Show citation
          this.textContent = 'Hide Citation'; // Update button text
        }
      });
    });
  });