const registerFormEl = document.querySelector('#register-form');

async function registerUser(e) {
    e.preventDefault();

    // Grab the form data
    const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
    };

    // Register route
    const url = '/auth/register';

    // Send a post fetch request to register route
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData), 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            // Request successful (status code 200) - go back to root
            window.location = '/';
        } else {
            // Server error
            const errorData = await res.json();
            console.error('Server error:', errorData);
        }
        
    } catch (err) {
        console.log('Error:', err);
    }
}

registerFormEl.addEventListener('submit', registerUser);