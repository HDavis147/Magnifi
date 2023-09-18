const router = require('express').Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
	try {
		// Create a new user with the data from the request body
		const userData = await User.create(req.body);

		// Save the user's id and logged_in status in the session
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			res.status(200).json(userData);
		});

		console.log(req.session);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Route to login a user
router.post('/login', async (req, res) => {
	try {
		// Find the user with the provided email
		const userData = await User.findOne({ where: { email: req.body.email } });

		// If no user is found, return an error message
		if (!userData) {
			res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		// Check if the provided password is valid
		const validPassword = await userData.checkPassword(req.body.password);

		// If the password is not valid, return an error message
		if (!validPassword) {
			res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
			return;
		}

		// Save the user's id and logged_in status in the session
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			res.json({
				user: userData,
				message: `${userData.name}, you are now logged in!`,
			});
		});

		console.log(req.session);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Route to logout a user
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		// Destroy the session and end the response with a status of 204
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		// If the user is not logged in, return a status of 404
		res.status(404).end();
	}
});

module.exports = router;
