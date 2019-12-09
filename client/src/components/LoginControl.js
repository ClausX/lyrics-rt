import React, { Component } from 'react';

class LoginControl extends Component {    
    render() {
        if (this.props.isLoggedIn) {
            return null;
        } else {
            return (
            <a href="http://localhost:8888/">
              <button>Login with Spotify</button>
            </a>);
        }
    }
}

export default LoginControl;