import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { RemoveRedEye } from '@material-ui/icons';
import './register.css';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Config from './../config';

const LoginUser = () => {
    const [credentials, setCredentials] = React.useState({ userName: '', password: '', canRedirect: false });
    const [snackBar, setSnackBar] = React.useState({ showSnackbar: false, snackBarColor: 'black', snackBarMessage: '' });
    const showPassword = () => {
        const elem = document.getElementById('pwd-login');
        setTimeout(() => {
            elem.setAttribute('type', 'password');
        }, 500);
        elem.setAttribute('type', 'text');
    }
    const loginClicked = async () => {
        const { data } = await axios.post(`${Config.baseUrl}/user/login`,
            {
                userName: credentials.userName,
                password: credentials.password
            });
        if (data.authenticated) {
            localStorage.setItem('incExamUserName', credentials.userName);
            localStorage.setItem('incExamAccessToken', data.token);
            setCredentials({ ...credentials, canRedirect: true });
        } else {
            setSnackBar({ showSnackbar: true, snackBarMessage: data.message, snackBarColor: 'red' });
        }
    }
    return (
        <div>
            <Paper id="loginPaper">
                <div id="loginForm">
                <div id="login">
                    <TextField
                        id="userName"
                        label="User Name"
                        value={credentials.userName}
                        onChange={(event) => setCredentials({ ...credentials, userName: event.target.value })}
                        margin="normal"
                        fullWidth
                        style={{ marginTop: '15px' }}
                    />
                    <div style={{display:'grid', gridTemplateColumns:'90% 10%'}}><TextField
                        id="pwd-login"
                        label="Password"
                        value={credentials.password}
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        margin="normal"
                        type="password"
                        style={{ marginTop: '0px', width: '100%' }}
                    />
                     <IconButton disabled={credentials.password === ''} onClick={showPassword}>
                        <RemoveRedEye />
                    </IconButton>
                    </div>
                    <div style={{marginTop:'15px',marginBottom:'20px', textAlign:'center'}}>
                    <Button style={{ marginLeft: '0px' }} disabled={credentials.userName === '' || credentials.password === ''} variant="contained" color="primary" onClick={loginClicked}>
                        Login
                </Button>
                </div>
                </div>
                </div>
            </Paper>
            {credentials.canRedirect && <Redirect to={`/userLanding/${credentials.userName}`} />}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackBar.showSnackbar}
                autoHideDuration={3000}
                onClose={() => setSnackBar({ ...snackBar, showSnackbar: false })}
            >
                <SnackbarContent aria-describedby="client-snackbar" style={{ backgroundColor: snackBar.snackBarColor }} message={snackBar.snackBarMessage} />
            </Snackbar>
            
        </div>
    )
}
export default LoginUser;