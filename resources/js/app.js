import '../css/app.css'
import Alpine from 'alpinejs'
import passwordValidator from './components/passwordValidator'

// Extend Alpine with profile completion modal functionality
Alpine.data('profileComplete', () => ({
  init() {
    // Check if profile is incomplete
    const birthdate = document.querySelector('[name="birthdate"]')?.value;
    const sex = document.querySelector('[name="sex"]')?.value;
    const isProfileIncomplete = !birthdate || !sex;

    // If profile is incomplete, ensure modal stays open
    if (isProfileIncomplete) {
      this.preventModalClose();
    }
  },

  preventModalClose() {
    // Override default close behaviors
    const modalCloseButtons = document.querySelectorAll('[x-on\\:click*="profileCompleteModal"]');
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        // Don't allow closing the modal
      });
    });

    // Prevent closing with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    });

    // Prevent closing by clicking outside
    const modalBackdrop = document.querySelector('[x-on\\:click\\.self*="profileCompleteModal"]');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  }
}));

window.Alpine = Alpine

// Register component before starting Alpine
Alpine.data('passwordValidator', passwordValidator)

Alpine.start()
