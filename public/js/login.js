// Event handler for login form submission
const loginFormHandler = async (event) => {
	event.preventDefault();

	// Get the values from the email and password input fields
	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	// Check if both email and password are provided
	if (email && password) {
		// Send a POST request to the login route with the email and password
		const response = await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		// If the response is successful, redirect to the homepage
		if (response.ok) {
			document.location.replace('/');
		} else {
			// If the response is not successful, display an error message
			alert(response.statusText);
		}
	}
};

// Event handler for signup form submission
const signupFormHandler = async (event) => {
	event.preventDefault();

	// Get the values from the name, email, and password input fields
	const name = document.querySelector('#name-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	// Check if name, email, and password are provided
	if (name && email && password) {
		// Send a POST request to the user route with the name, email, and password
		const response = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		// If the response is successful, redirect to the homepage
		if (response.ok) {
			document.location.replace('/');
		} else {
			// If the response is not successful, display an error message
			alert(response.statusText);
		}
	}
};

// Add event listeners to the login and signup forms
document
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);
document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);
