document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.dropdown-btn');

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            const dropdownContent = this.nextElementSibling;

            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show'); // Collapse citation
                this.textContent = 'Show Citation'; // Update button text
            } else {
                dropdownContent.classList.add('show'); // Expand citation
                this.textContent = 'Hide Citation'; // Update button text
            }
        });
    });
});