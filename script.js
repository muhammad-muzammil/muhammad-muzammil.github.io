document.querySelector('.dropdown-btn').addEventListener('click', function () {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
      dropdownContent.style.display = 'block'; // Show the citation
      this.textContent = 'Hide Citation'; // Update button text
    } else {
      dropdownContent.style.display = 'none'; // Hide the citation
      this.textContent = 'Show Citation'; // Update button text
    }
  });