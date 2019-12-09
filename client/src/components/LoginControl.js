import React, { Component } from 'react';

class LoginControl extends Component {    
    render() {
        if (this.props.isLoggedIn) {
            return null;
        } else {
            return (
                // href should be a link to some spotify authorization server
            <a href="http://localhost:8888/"> 
              <button>Login with Spotify</button>
            </a>);
        }
    }
}

export default LoginControl;