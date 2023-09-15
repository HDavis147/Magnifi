const spotifyBtn = document.querySelector('#spotify-button');
const getSongsBtn = document.querySelector('#get-songs-button')

const splitUrl = () => {
	const url = window.location.href;
	const spliceUrl = url.split('=')
	const refreshToken = spliceUrl[3]
	const accessToken = spliceUrl[2].replace('&refresh_token', '')

	console.log(refreshToken)
	console.log(accessToken)
	getSongsInJQuery(accessToken)

}

const linkBtn = async (event) => {
	event.preventDefault();
const changeUrl = await window.location.replace("/login")
return changeUrl
}


// jquery fetch request
async function getSongsInJQuery(accessToken) {
	await $.ajax({
		method: 'GET',
		url: 'https://api.spotify.com/v1/me/top/tracks',

		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
		success: function (response) {
			console.log(response);
			// const songData = {
			// 	name: response,
			// 	json: true,
			// };
			// console.log(songData);
			// const artistData = {
			// 	name: response.items.artists.name,
			// 	json: true,
			// };
			// console.log(artistData);

			// createPlaylist(songData, artistData);
		},
	});
}
async function createPlaylist(data) {
	const songNames = data.items.name;
	const artistNames = data.items.arist.name;
	console.log(songs);
	console.log(artists);
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
			'Content-Type': 'application/json',
		},
	});

	document.location.reload();
}
// event listener to listen for button click then run getSongs()
// submitBtn.addEventListener('submit', getSongs)

spotifyBtn.addEventListener('click', linkBtn);
getSongsBtn.addEventListener('click', splitUrl)