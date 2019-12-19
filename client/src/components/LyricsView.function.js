import React, { useState, useEffect } from 'react';

const LyricsView = (props) => {
    const [songUrl, setSongUrl] = useState('https://www.genius.com/');
    const [imgUrl, setImgUrl] = useState();
    const [songName, setSongName] = useState();

    useEffect(() => {
        const baseUrl = 'https://api.genius.com/';
        const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN_GENIUS;
        const searchUrl = baseUrl + 'search?q=';
        const searchQuery = encodeURIComponent(`${props.song} ${props.artist}`).trim();

            fetch(searchUrl + searchQuery + ';access_token=' + ACCESS_TOKEN)
            .then(response => {
                return response.json()})
            .then(json => {
                return json.response.hits[0];})
            .then(songObject => {
                if (songObject) {
                    setSongUrl(songObject.result.url);
                    setSongName(songObject.result.title);
                    setImgUrl(songObject.result.song_art_image_url);
                }
            });        
    });

    return ( 
        <div>
            <img src={imgUrl} alt="" height="320" width="320" />
            <div>{songName} lyrics on <a href={songUrl} rel="noopener noreferrer" target="_blank">Genius</a></div>
        </div>
    );
}

export default LyricsView;