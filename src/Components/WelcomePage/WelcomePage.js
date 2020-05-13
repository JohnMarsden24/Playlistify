import React from 'react';
import './WelcomePage.css';

import Button from '../Button/Button';
import ResultsImage from './results-image.png';

class WelcomePage extends React.Component {
  render() {
    return (
      <div className="welcome-page-container">
        <div>
          <h1 className="title">play<span className="highlight">listify.</span></h1>
          <div className="small-text-container">
            <p>
              <span className="intro-text">
              Search for songs from Spotify, create new playlists and then upload them to your account.
              </span>
              <br/>
              <br/>
              To get started just sign in to Spotify using the button below.
            </p>
          </div>
          <Button buttonMethod={this.props.login} text="Sign in"/>
        </div>
        <img src={ResultsImage} alt="example of results and playlist" className="hero-img"/>
      </div>
    )
  }
}

export default WelcomePage;
