import React, { Component } from 'react';
import './App.css';
import LyricsView from './components/LyricsView.function.js';
import LoginControl from './components/LoginControl.js'
import SpotifyWebApi from 'spotify-web-api-js';
require('dotenv').config();

const spotifyWebApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      isLoggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "not checked",
        artist: {
          name: "not checked"
        }
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  componentDidMount() {
    if (this.state.isLoggedIn){
      this.getNowPlaying();
    }
  }

  /**
   * Code in getHashParams was used in spotify example, and copied from there
   */
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then(response => {
      if(response.item) {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: {
              name: response.item.artists[0].name
            }
          }
        })
      }
    });
  }

  render() {  
    const isLoggedIn = this.state.isLoggedIn;
    let 
      listeningDisplay, 
      button;

    if (isLoggedIn) {
      listeningDisplay = <p>You are listening to {this.state.nowPlaying.name} by {this.state.nowPlaying.artist.name}</p>;
      button = <button onClick={() => this.getNowPlaying()}>Get current song</button>;
    } else {
      listeningDisplay = <p>What are you listening to?</p>;
      button = <LoginControl isLoggedIn={this.state.isLoggedIn} />;
    }

    return (
      <div className="App">
        <header className="App-header">
          { listeningDisplay }
          <LyricsView song={this.state.nowPlaying.name} artist={this.state.nowPlaying.artist.name}></LyricsView>
          { button }
        </header>
      </div>
    );
  }
}

export default App;
