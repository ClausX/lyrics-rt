import React, { Component } from 'react';
import './App.css';
import LyricsView from './components/LyricsView.js';
import LoginControl from './components/LoginControl.js'
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyWebApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      isLoggedIn: params.access_token ? true : false,
      doGetNowPlaying: true,
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

  getHashParams() {
    console.log("in getHashParams");
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
        console.log("in getNowPlaying", response);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            artist: {
              name: response.item.artists[0].name
            }
          },
          doGetNowPlaying: false
        })
      });
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          
          <p>You are listening to {this.state.nowPlaying.name} by {this.state.nowPlaying.artist.name}</p>
          <LyricsView song={this.state.nowPlaying.name} artist={this.state.nowPlaying.artist.name}></LyricsView>
          
          <LoginControl isLoggedIn={this.state.isLoggedIn} />
          <button onClick={() => this.getNowPlaying()}>Get current song</button>
        </header>
      </div>
    );
  }
}

export default App;
