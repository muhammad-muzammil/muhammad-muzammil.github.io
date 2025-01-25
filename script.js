document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    button.addEventListener('click', function () {
      // Toggle the 'show' class on the dropdown content
      dropdownContent.classList.toggle('show');
  
      // Update button text
      this.textContent = dropdownContent.classList.contains('show')
        ? 'Hide Citation'
        : 'Show Citation';
    });
  });