 import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import SignInButton from '../SignInButton/SignInButton';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist1',
      playlistTracks: [],
      src: ""
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.setTrack = this.setTrack.bind(this);
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
    if (window.location.href !== 'http://localhost:3000/') {
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
    }
  };

  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks
    let newplaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({playlistTracks: newplaylistTracks});
  };

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  };

  setTrack(track) {
    this.setState({src: track});
  };

  async search(term) {
    const results = await Spotify.search(term, this.state.token);
    this.setState({searchResults: results});
  };

  async savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    await Spotify.savePlaylist(this.state.playlistName, trackUris, this.state.token);
    this.setState({playlistName: 'New Playlist'});
    this.setState({playlistTracks: []});
  };

  render() {

    let button;

    if (this.state.token) {
      button = <SearchBar onSearch={this.search} />
    } else {
      button = <SignInButton login={this.login} />
    }

    return (
      <div>
        <h1><span className="highlight">play</span>listify</h1>
        <div className="App">
          {button}
          <MusicPlayer src={this.state.src} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} setTrack={this.setTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              setTrack={this.setTrack} />
          </div>
        </div>
      </div>
    );
  }
};


export default App;
