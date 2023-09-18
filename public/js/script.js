const spotifyBtn = document.querySelector('#spotify-button');
const getSongsBtn = document.querySelector('#get-songs-button');

// Function to split the URL and extract the access token and refresh token
const splitUrl = () => {
	const url = window.location.href;
	const params = new URLSearchParams(url.split('#')[1]);
	const accessToken = params.get('access_token');
	const refreshToken = params.get('refresh_token');

	console.log(refreshToken);
	console.log(accessToken);

	getSongsInJQuery(accessToken);
};

// Function to change the URL to "/login" when the link button is clicked
const linkBtn = async (event) => {
	event.preventDefault();
	const changeUrl = await window.location.replace('/login');
	return changeUrl;
};

// jQuery fetch request to get songs using the access token
async function getSongsInJQuery(accessToken) {
	await $.ajax({
		method: 'GET',
		url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		success: function (response) {
			console.log(response);
			const songData = [];
			const artistData = [];

			for (var i = 0; i < response.items.length; i++) {
				response.items[i].name = response.items[i].name.toUpperCase();
				const song = response.items[i].name;
				songData.push(song);

				for (var j = 0; j < response.items[i].artists.length; j++) {
					response.items[i].artists[j].name =
						response.items[i].artists[j].name.toUpperCase();
					const artist = response.items[i].artists[j].name;
					artistData.push(artist);

					if (response.items[i].artists.length > 1) {
						indexSkip = response.items[i].artists.length - 1;
						j += indexSkip;
					}
				}
			}

			console.log(songData);
			console.log(artistData);
			createPlaylist(artistData, songData);
		},
	});
}

// Function to create a playlist by sending a POST request to the server
async function createPlaylist(artistArray, songArray) {
	try {
		const songData = songArray.join(', ');
		const artistData = artistArray.join(', ');

		console.log(songData);
		console.log(artistData);

		const response = await fetch('/api/playlist/', {
			method: 'POST',
			body: JSON.stringify({
				date_created: new Date().toISOString(),
				song_name: songData,
				artist_name: artistData,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const playlist = await response.json();
			const playlistId = playlist.id;
			window.location.replace(`/collection/${playlistId}`);
		} else {
			console.error('Failed to create playlist:', response.status);
		}
	} catch (error) {
		console.error('Error creating playlist:', error);
	}
}

// Event listeners for the Spotify button and the Get Songs button
spotifyBtn.addEventListener('click', linkBtn);
getSongsBtn.addEventListener('click', splitUrl);
