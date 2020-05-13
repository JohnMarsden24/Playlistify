import React from 'react';
import './Playlist.css';

import Tracklist from '../Tracklist/Tracklist';
import Button from '../Button/Button';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  };

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  };

  buttonTextChange() {
    if (this.props.playlistSaved) {
      return <p>Playlist saved</p>
    }
  }

  render() {
    return(
      <div className="tracklist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
        <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <div className="save-button">
          <Button buttonMethod={this.props.onSave} text="Save to Spotify" />
          {this.buttonTextChange()}
        </div>
      </div>
    )
  };
};

export default Playlist
