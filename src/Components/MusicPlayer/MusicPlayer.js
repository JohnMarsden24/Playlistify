import React from 'react';

class MusicPlayer extends React.Component {

  render() {
    return (
      <div>
        <iframe src={`https://open.spotify.com/embed/track/${this.props.src}`} width="100%" height="80" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    )
  }
}

export default MusicPlayer
