import React, { Component } from 'react';

class LyricsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songUrl: "https://www.genius.com/",
            imgUrl: "",
            songName: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.song !== prevProps.song || this.props.artist !== prevProps.artist) {
            const baseUrl = 'https://api.genius.com/';
            const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN_GENIUS;
            const searchUrl = baseUrl + 'search?q=';
            const searchQuery = encodeURIComponent(`${this.props.song} ${this.props.artist}`).trim();

            fetch(searchUrl + searchQuery + ';access_token=' + ACCESS_TOKEN)
            .then(response => {
                return response.json()})
            .then(json => {
                return json.response.hits[0];})
            .then(songObject => {
                if (songObject) {
                    this.setState({
                        songUrl: songObject.result.url,
                        songName: songObject.result.title,
                        imgUrl: songObject.result.song_art_image_url
                    });
                }
            });
        }
    }

    render() {
        return ( 
            <div>
                <img src={this.state.imgUrl} alt="" height="320" width="320" />
                <div>{this.state.songName} lyrics on <a href={this.state.songUrl} rel="noopener noreferrer" target="_blank">Genius</a></div>
            </div>
        );
    }
}

export default LyricsView;