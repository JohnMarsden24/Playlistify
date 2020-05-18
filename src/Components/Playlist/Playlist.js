import React from 'react';
import './Playlist.css';

import Tracklist from '../Tracklist/Tracklist';
import Button from '../Button/Button';
import Tick from './tick.svg'

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  };

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  };

  playlistSaveSuccess() {
    if (this.props.playlistSaved) {
      this.refs.input.value = '';
      return <div className="playlist-saved">
        <p>Playlist saved</p>
        <img src={Tick} alt=""/>
      </div>
    }
  }

  render() {
    return(
      <div className="tracklist-container">
        <input placeholder="Enter new playlist name" onChange={this.handleNameChange} ref="input" />
        <Tracklist className="tracklist-playlist" tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <div className="save-button">
          <Button buttonMethod={this.props.onSave} text="Save to Spotify" />
          {this.playlistSaveSuccess()}

        </div>
      </div>
    )
  };
};

export default Playlist
