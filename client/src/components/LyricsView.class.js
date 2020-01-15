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

    async componentDidUpdate(prevProps) {
        if (this.props.song !== prevProps.song || this.props.artist !== prevProps.artist) {
            const songData = await this.getSongData(this.props.song, this.props.artist, process.env.REACT_APP_ACCESS_TOKEN_GENIUS);
            this.setState({
                songUrl: songData.result.url,
                songName: songData.result.title,
                imgUrl: songData.result.song_art_image_url
            });
        }
    }

    async getSongData(song, artist, token) {
        const baseUrl = 'https://api.genius.com/';
        const searchUrl = baseUrl + 'search?q=';
        const searchQuery = encodeURIComponent(`${song} ${artist}`).trim();

        try {
            const response = await fetch(searchUrl + searchQuery + ';access_token=' + token);
            const json = await response.json();
            return json.response.hits[0];
        } catch (error) {
            
        }
        
/*
        .then(response => {
            return response.json()})
        .then(json => {
            return json.response.hits[0];})
        .then(songObject => {
            if (songObject) {
                return songObject;
            }
        });*/
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