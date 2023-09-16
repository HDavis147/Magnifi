const spotifyBtn = document.querySelector('#spotify-button');
const getSongsBtn = document.querySelector('#get-songs-button')

// const splitUrl = () => {
// 	const url = window.location.href;
// 	const spliceUrl = url.split('=')
// 	const refreshToken = spliceUrl[3]
// 	const accessToken = spliceUrl[2].replace('&refresh_token', '')

// 	console.log(refreshToken)
// 	console.log(accessToken)
// 	getSongsInJQuery(accessToken)

// }

const splitUrl = () => {
	const url = window.location.href;
	const params = new URLSearchParams(url.split('#')[1]);
	const accessToken = params.get('access_token');
	const refreshToken = params.get('refresh_token');
  
	
	console.log(refreshToken);
	console.log(accessToken);
	
	getSongsInJQuery(accessToken);
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
			console.log(response);
			const songData = [];
			const artistData = [];

			for (var i = 0; i < response.items.length; i++) {
				response.items[i].name = response.items[i].name.toUpperCase();
				const song = {
					name: response.items[i].name,
					json: true,
				};
				songData.push(song);

				for (var j = 0; j < response.items[i].artists.length; j++) {
					response.items[i].artists[j].name = response.items[i].artists[j].name.trim();
					response.items[i].artists[j].name = response.items[i].artists[j].name.toUpperCase();
					if (j != response.items[i].artists.length - 1) {
						response.items[i].artists[j].name += ", ";
					}
					const artist = {
						name: response.items[i].artists[j].name,
						json: true,
					};
					artistData.push(artist);
				}
			}
			console.log(songData);
			console.log(artistData);
			// createPlaylist(artistData, songData)
		},
	});
}
async function createPlaylist(artistArray, songArray) {
	// console.log(artistArray, songArray);
	const songData = songArray
	const artistData = artistArray
	console.log(songData);
	console.log(artistData);
	// const song_name = songs
	// const artist_name = artists

	const response = await fetch(`/api/playlist`, {
		method: 'POST',
		body: JSON.stringify({
			date_created: new Date().toISOString(),
			song_name: songData,
			artist_name: artistData
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response
	// document.location.reload();
}
// event listener to listen for button click then run getSongs()
// submitBtn.addEventListener('submit', getSongs)

spotifyBtn.addEventListener('click', linkBtn);
getSongsBtn.addEventListener('click', splitUrl)