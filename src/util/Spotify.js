let accessToken;
const clientId = 'bebf63b857ce4a55a9ffb21ebe21ef5e';
const redirectUri = window.location.href;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiringTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiringTimeMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiringTimeMatch[1]);
      window.setTimeout(() => accessToken ='', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    };
  },

  async search(term, accessToken) {
    // const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    } else {
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      })
    }
  },

  async savePlaylist(name, trackUris, accessToken) {
    if (!name || !trackUris) {
      return
    };
    // const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userId;
    const response = await fetch(`https://api.spotify.com/v1/me`,
      {
        headers: headers
      })
    const jsonResponse = await response.json();
    userId = jsonResponse.id;
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify( {name: name})
      }
      );
    const playlist = await playlistResponse.json();
    const playlistId = playlist.id;
    const newPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify( {uris: trackUris})
      }
    );
    const newPlaylistResponseJson = await newPlaylistResponse.json();
    // const newPlaylistId = newPlaylistResponseJson.id;
    return newPlaylistResponseJson.snapshot_id
    // return newPlaylistId;
  }
};

export default Spotify
