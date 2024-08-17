document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Simple validation
    if (username === 'user' && password === 'password123') {
        window.location.href = 'index.html'; // Redirect to the home page
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Thank you for your message!');
        this.reset();  // Clear the form
    } else {
        alert('Please fill out all fields.');
    }
});
