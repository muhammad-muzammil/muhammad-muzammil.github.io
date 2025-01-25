document.querySelector('.dropdown-btn').addEventListener('click', function () {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none'; // Hide citation
      this.textContent = 'Show Citation'; // Update button text
    } else {
      dropdownContent.style.display = 'block'; // Show citation
      this.textContent = 'Hide Citation'; // Update button text
    }
  });