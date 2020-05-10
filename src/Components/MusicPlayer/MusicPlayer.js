import React from 'react';

const links = {
  'Calm With Horses': "4YmWmoshc1KRw6Q4zM2idj",
  'Animated Violence Mild': "74tQiCbJ97DTI7zsRbj55f",
  'World Eater': "6WElx5zuqd2CYiyea4oEc8"
}

class MusicPlayer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { src:  };
  //   this.setAlbum = this.setAlbum.bind(this);
  // }

  setAlbum(albumLink) {
    this.setState({src: albumLink})
  }

  render() {
    return (
      <div>
        <iframe src={`https://open.spotify.com/embed/track/${this.props.src}`} width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    )
  }
}

export default MusicPlayer


