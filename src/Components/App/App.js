 import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import MusicPlayer from '../MusicPlayer/MusicPlayer'
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

  componentDidMount() {
    window.addEventListener('load', Spotify.search(''));
  }

  async savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    await Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({playlistName: 'New Playlist'});
    this.setState({playlistTracks: []});
  };

  async search(term) {
    const results = await Spotify.search(term);
    this.setState({searchResults: results});
  };

  render() {
    return (
      <div>
        <h1><span className="highlight">play</span>listify</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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
