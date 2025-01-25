document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    button.addEventListener('click', function () {
      dropdownContent.classList.toggle('show'); // Toggle the "show" class
  
      // Update button text based on visibility
      this.textContent = dropdownContent.classList.contains('show')
        ? 'Hide Citation'
        : 'Show Citation';
    });
  });