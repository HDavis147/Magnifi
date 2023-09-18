// logout function to run when the logout button is clicked
const logout = async () => {
	const response = await fetch('/api/user/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
	// if the logout is succesful redirect to the /userlogin
	if (response.ok) {
		document.location.replace('/userlogin');
		// if the logout is unsuccessful give an alert to the user
	} else {
		alert(response.statusText);
	}
};

document.querySelector('#logout').addEventListener('click', logout);
