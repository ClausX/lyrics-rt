import React, { Component } from 'react';

class LoginControl extends Component {    
    render() {
        if (this.props.isLoggedIn) {
            return null;
        } else {
            return (
            <a href="https://hidden-taiga-18909.herokuapp.com//"> 
              <button>Login with Spotify</button>
            </a>);
        }
    }
}

export default LoginControl;