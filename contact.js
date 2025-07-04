document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form#contact');
    const statusSuccess = document.getElementById('contact-success');
    const statusFailure = document.getElementById('contact-failure');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        statusSuccess.classList.add('hidden');
        statusFailure.classList.add('hidden');

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.text();
            console.log('Form submitted successfully:', result);

            statusSuccess.classList.remove('hidden');
            form.classList.add('hidden');
        } catch (error) {
            statusFailure.classList.remove('hidden');
            console.error('Submission failed:', error);
        }
    });
});
