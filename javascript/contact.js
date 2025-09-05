document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit-button');
    const consentModal = document.getElementById('consent-modal');
    const modalContent = consentModal.querySelector('div');
    const acceptConsentButton = document.getElementById('accept-consent');
    const cancelConsentButton = document.getElementById('cancel-consent');
    
    // Function to validate an email address
    const validateEmail = (email) => {
        const re = /^\S+@\S+\.\S+$/;
        return re.test(email);
    };

    // Main function to submit the form
    const submitForm = async () => {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Fetch user's IP address
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const userIp = ipData.ip || 'Not Found';

            // Append the IP to the message
            const originalMessage = messageInput.value;
            const messageWithIp = `${originalMessage}\n\n--- User Info ---\nSender IP: ${userIp}`;
            
            // Create a new FormData object for the fetch request
            const formData = new FormData(form);
            formData.set('message', messageWithIp);
            
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                successMessage.classList.remove('hidden');
                form.reset();
            } else {
                errorMessage.classList.remove('hidden');
                const errorData = await response.json();
                console.error('Form submission error:', errorData);
            }
        } catch (error) {
            console.error('Form submission failed:', error);
            errorMessage.classList.remove('hidden');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    };

    // Event listener for the main form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Hide any previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        emailError.classList.add('hidden');

        const userEmail = emailInput.value;
        if (!validateEmail(userEmail)) {
            emailError.classList.remove('hidden');
            return;
        }
        
        // Show the consent modal with animations
        consentModal.classList.remove('hidden');
        setTimeout(() => {
            consentModal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    });

    // Event listener for the "Accept" button in the modal
    acceptConsentButton.addEventListener('click', () => {
        consentModal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            consentModal.classList.add('hidden');
            submitForm();
        }, 300); // Corresponds to the CSS transition duration
    });

    // Event listener for the "Cancel" button in the modal
    cancelConsentButton.addEventListener('click', () => {
        consentModal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            consentModal.classList.add('hidden');
        }, 300); // Corresponds to the CSS transition duration
    });
});