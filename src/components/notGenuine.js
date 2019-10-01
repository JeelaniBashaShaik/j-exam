import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const NotGenuine = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <img src="./thief.jpg" height="400" width="50%" />
            <h3>You are not Authenticated to view this route, please login and try again</h3>
            <Link to="/home"><Button variant="contained" color="primary">Login</Button></Link>
        </div>
    )
}

export default NotGenuine;