import React from 'react';
import './Track.css';

import MusicPlayer from '../MusicPlayer/MusicPlayer';
import Playbutton from './play-button.svg';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleClick = this.handleClick.bind(this);
  };

  renderAction() {
    if (this.props.isRemoval) {
      return <button className='track-action' onClick={this.removeTrack}>-</button>
    } else {
      return <button className='track-action' onClick={this.addTrack}>+</button>
    }
  };

  addTrack() {
    this.props.onAdd(this.props.track);
  };

  removeTrack() {
    this.props.onRemove(this.props.track);
  };

  handleClick() {
    this.state.active ? this.setState({active: false}) : this.setState({active: true})
  };

  rotatePlayButton() {
    return this.state.active ? "img-rotate" : "img-straight"
  };

  musicPlayerVisible() {
    return (this.state.active ? "show" : "");
  };

  render() {
    return(
      <div className="track-card">
        <div className="track-details">
          <img
          src={Playbutton}
          alt="play button"
          onClick={this.handleClick}
          className={`play-button ${this.rotatePlayButton()}`}/>
          <div className="track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          { this.renderAction() }
        </div>
        <MusicPlayer
        src={this.props.track.id}
        visible={this.musicPlayerVisible()} />
      </div>
    )
  };
};

export default Track;
