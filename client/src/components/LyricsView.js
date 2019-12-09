import React, { Component } from 'react';
// import { parse } from 'node-html-parser';

class LyricsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            embeded: "",  
            song_url: "https://www.genius.com/",
            img_url: "",
            api_path: "",
            song_name: ""
        }
    }

    render() {
           // THIS SHOULDN*T BE DONE HER BUT I DONT CARE ATM
        const base_url = 'https://api.genius.com/',
            ACCESS_TOKEN = 'access_token', // THIS IS SECRET
            songId = '378195',
            songs_url = base_url + 'songs/',
            search_url = base_url + 'search?q=';
        const songName = encodeURIComponent(this.props.song).trim();
        const artistName = encodeURIComponent(this.props.artist).trim();

        fetch(search_url + songName + artistName + ';access_token=' + ACCESS_TOKEN)
            .then(response => {
                return response.json()})
            .then(json => {
                return json.response.hits[0];
                
            })
            .then(songObject => {
                if (songObject) {
                    console.log(songObject);
                    this.setState({
                        song_url: songObject.result.url,
                        song_name: songObject.result.title,
                        img_url: songObject.result.song_art_image_url
                    });
                    console.log(this.state.song_url, this.state.song_name);
                    /*fetch(base_url + songObject.api_path + '?access_token=' + ACCESS_TOKEN)
                        .then(response => {
                            return response.json()})
                        .then(json => {
                            console.log(json);
                            this.setState({
                                song_url: json.response.song.url,
                                embeded: json.response.song.embed_content,
                                img_url: json.response.song.song_art_image_url
                        })
                    });*/ 
                }
            });

                
        /*fetch(songs_url + songId + '?access_token=' + ACCESS_TOKEN)
            .then(response => { 
                return response.json()})
            .then(json => {
                this.setState({
                    song_url: json.response.song.url,
                    embeded: json.response.song.embed_content,
                    img_url: json.response.song.song_art_image_url
                });
            });*/

        /*return (
            <div>
                <img src={this.state.img_url} alt="" height="320" width="320" />
                <div dangerouslySetInnerHTML={{__html: this.state.embeded}} />
            </div>
        );*/
        return ( 
            <div>
                <img src={this.state.img_url} alt="" height="320" width="320" />
                <div>{this.state.song_name} lyrics on <a href={this.state.song_url} rel="noopener noreferrer" target="_blank">Genius</a></div>
                
            </div>
        );
    }
}

export default LyricsView;