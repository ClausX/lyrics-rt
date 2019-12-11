import React, { Component } from 'react';
// import { parse } from 'node-html-parser';

class LyricsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song_url: "https://www.genius.com/",
            img_url: "",
            api_path: "",
            song_name: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.song !== prevProps.song || this.props.artist !== prevProps.artist) {
            const 
                base_url = 'https://api.genius.com/',
                ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN_GENIUS,
                search_url = base_url + 'search?q=',
                searchQuery = encodeURIComponent(this.props.song+ " " + this.props.artist).trim();

            fetch(search_url + searchQuery + ';access_token=' + ACCESS_TOKEN)
            .then(response => {
                return response.json()})
            .then(json => {
                return json.response.hits[0];})
            .then(songObject => {
                if (songObject) {
                    this.setState({
                        song_url: songObject.result.url,
                        song_name: songObject.result.title,
                        img_url: songObject.result.song_art_image_url
                    });
                }
            });
        }
    }

    render() {
        return ( 
            <div>
                <img src={this.state.img_url} alt="" height="320" width="320" />
                <div>{this.state.song_name} lyrics on <a href={this.state.song_url} rel="noopener noreferrer" target="_blank">Genius</a></div>
            </div>
        );
    }
}

export default LyricsView;