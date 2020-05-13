import React from 'react';
import './MusicPlayer.css';

class MusicPlayer extends React.Component {

  srcPresent() {
    return (this.props.src) ? `https://open.spotify.com/embed/track/${this.props.src}` : ""
  }

  render() {
    return (
      <iframe
      src={this.srcPresent()}
      className={`music-player ${this.props.visible}`}
      allowtransparency="true"
      allow="encrypted-media" />
    )
  }
}

export default MusicPlayer
