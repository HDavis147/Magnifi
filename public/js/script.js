// const submitBtn = document.querySelector();
// try this javascript fetch request
async function getSongsInJavascript() {
	const headers = { 'Authorization' : 'Bearer ' + accessToken }
	const response = await fetch("your url here", { headers });

	if (!response.ok) {
		const message = `An error has occurred: ${response.status}`
		throw new Error(message);
	}
	const songData = await response.json();
	console.log(songData)
	createPlaylist(songData)
	return songData
}

// jquery fetch request
async function getSongsInJQuery() {
	await $.ajax({
		method: 'GET',
		url: 'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term',

		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		success: function (response) {

			const songData = {
				name: response.items.name,
				json: true
			}
			console.log(songData)
			const artistData = {
				name: response.items.artists.name,
				json: true
			}
			console.log(artistData)
			// for (var i = 0; i < data.songList.length; i++) {
			// 	data.songList[i].name = data.songList[i].name.toUpperCase() + ' - ';
			// 	for (var j = 0; j < data.songList[i].artists.length; j++) {
			// 		data.songList[i].artists[j].name =
			// 			data.songList[i].artists[j].name.trim();
			// 		data.songList[i].artists[j].name =
			// 			data.songList[i].artists[j].name.toUpperCase();
			// 		if (j != data.songList[i].artists.length - 1) {
			// 			data.songList[i].artists[j].name += ', ';
			// 		}
			// 	}
			// }

			createPlaylist(songData, artistData);
		},
	});
};
async function createPlaylist(data) {
	const songNames = data.items.name
	const artistNames = data.items.arist.name
	console.log(songs)
	console.log(artists)
	// const song_name = songs
	// const artist_name = artists

	const response = await fetch(`/api/playlist`, {
		method: 'POST',
		body: JSON.stringify({
			date_created: new Date().toISOString(),
			song_name,
			artist_name,
			user_id,
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	document.location.reload();
}
// event listener to listen for button click then run getSongs()
// submitBtn.addEventListener('submit', getSongs)
