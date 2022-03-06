// inspired by https://auth0.com/blog/creating-a-splash-screen-for-your-react-apps/

import React, { Component } from 'react';
import '../styles/splash-screen.css';

function LoadingMessage() {
    return (
        <div className="splash-screen">
            Me, An Empath
            <div className="loading-dot">.</div>
        </div>
    );
}

function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        componentDidMount() {
            try {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 3000);
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            // while checking user session, show "loading" message
            if (this.state.loading) return LoadingMessage();

            // otherwise, show the desired route
            return <WrappedComponent {...this.props} />;
        }
    };
}

export default withSplashScreen;