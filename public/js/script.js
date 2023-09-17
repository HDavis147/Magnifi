const spotifyBtn = document.querySelector('#spotify-button');
const getSongsBtn = document.querySelector('#get-songs-button');


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
			const songData = [];
			const artistData = [];

			for (var i = 0; i < response.items.length; i++) {
				response.items[i].name = response.items[i].name.toUpperCase();
				const song = [response.items[i].name]
				songData.push(song);
			
				

				for (var j = 0; j < response.items[i].artists.length; j++) {
					response.items[i].artists[j].name = response.items[i].artists[j].name.toUpperCase();
					
					const artist = {
						name: response.items[i].artists[j].name
					};
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
// async function createPlaylist(artistArray, songArray) {
// 	// console.log(artistArray, songArray);
// 	const songData = songArray
// 	const artistData = artistArray
// 	console.log(songData);
// 	console.log(artistData);
// 	const song_name = songData
// 	const artist_name = artistData

// 	const response = await fetch(`/api/playlist`, {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			date_created: new Date().toISOString(),
// 			song_name,
// 			artist_name,
// 		}),
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	});
// }
async function createPlaylist(artistArray, songArray) {
	try {
		const songData = songArray.map(song => song.name).join(' ');
		const artistData = artistArray.map(artist => artist.name).join();	
  
	  console.log(songData);
	  console.log(artistData);
  
  
	  const response = await fetch('/api/playlist', {
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
		document.location.replace('/collection');
	  } else {
		console.error('Failed to create playlist:', response.status);
	  }
	} catch (error) {
	  console.error('Error creating playlist:', error);
	}
  }
// event listener to listen for button click then run getSongs()
// submitBtn.addEventListener('submit', getSongs)
spotifyBtn.addEventListener('click', linkBtn);
getSongsBtn.addEventListener('click', splitUrl)





