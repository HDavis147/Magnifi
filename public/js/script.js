
	const getSongs = () => {
		$.ajax({
			method: 'GET',
			url: 'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term',

			headers: {
				Authorization: 'Bearer ' + accessToken,
			},
			success: function (response) {
				const data = {
					songList: response.items,
					//   date: 
					json: true,
				};

				for (var i = 0; i < data.songList.length; i++) {
					data.songList[i].name =
						data.songList[i].name.toUpperCase() + ' - ';
					for (var j = 0; j < data.songList[i].artists.length; j++) {
						data.songList[i].artists[j].name =
							data.songList[i].artists[j].name.trim();
						data.songList[i].artists[j].name =
							data.songList[i].artists[j].name.toUpperCase();
						if (j != data.songList[i].artists.length - 1) {
							data.songList[i].artists[j].name += ', ';
						}
					}
				}
				;
			},
		});
	}
