import React from 'react';
import { Redirect } from 'react-router-dom';

export default class userLanding extends React.Component {

    componentDidMount() { }
    render() {
        const userName = localStorage.getItem('incExamUserName');
        return (
            <div>
                {
                    userName === 'admin987' && <Redirect to="/admin" />
                }
                {
                    userName !== 'admin987' && <Redirect to="/tests" />

                }
            </div>
        )
    }
}