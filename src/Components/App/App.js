import React from 'react';
import './App.css';

import WelcomePage from '../WelcomePage/WelcomePage';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist1',
      playlistTracks: [],
      playlistSaved: false
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.login = this.login.bind(this);
  };

  componentDidMount() {
    this.setState({token: this.accessToken()})
  };

  login() {
    Spotify.getAccessToken();
  };

  accessToken() {
    let accessToken;
    if (/access_token=([^&]*)/.test(window.location.href)) {
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      accessToken = accessTokenMatch[1];
      return accessToken;
    } else {
      return accessToken;
    }
  };

  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return ;
    } else {
      playlistTracks.push(track);
      this.setState({playlistTracks: playlistTracks})
      const newSearchResults = this.state.searchResults.filter(resultTrack => resultTrack.id !== track.id)
      this.setState({searchResults: newSearchResults})
    }
  };

  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks
    let newplaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({playlistTracks: newplaylistTracks});
    this.state.searchResults.unshift(track);
  };

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  };

  async search(term) {
    const results = await Spotify.search(term, this.state.token);
    this.setState({searchResults: results});
  };

  async savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    const playlist = await Spotify.savePlaylist(this.state.playlistName, trackUris, this.state.token);
    if (playlist) {
      this.setState({playlistName: 'New Playlist'});
      this.setState({playlistTracks: []});
      this.setState({playlistSaved: true})
    } else {
      alert("Playlist did not save, please try again");
    }
  };

  render() {

    let view;

    if (this.state.token) {
      view =
        <div className="search-page-container">
          <div>
            <h1 className="title">play<span className="highlight">listify.</span></h1>
            <SearchBar onSearch={this.search} />
          </div>
          <div className="tracklist-container">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              setTrack={this.setTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              setTrack={this.setTrack}
              playlistSaved={this.state.playlistSaved} />
          </div>
        </div>
    } else {
      view = <WelcomePage login={this.login} />
    }

    return (
      <div className="page-container">
        <BackgroundImage />
        <div className="text-container">
          {view}
        </div>
      </div>
    );
  }
};

export default App;
