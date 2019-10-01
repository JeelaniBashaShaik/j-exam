import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
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
            <Paper style={{ margin: '40px', padding: '20px' }}>
                <h3>Login</h3>
                <div>
                    <TextField
                        id="userName"
                        label="User Name"
                        value={credentials.userName}
                        onChange={(event) => setCredentials({ ...credentials, userName: event.target.value })}
                        margin="normal"
                        fullWidth
                        style={{ marginTop: '0px' }}
                    />
                    <span><TextField
                        id="pwd-login"
                        label="Password"
                        value={credentials.password}
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        margin="normal"
                        type="password"
                        style={{ marginTop: '0px', width: '65%' }}
                    /><Button style={{ marginTop: '10px', marginLeft: '10px' }} disabled={credentials.password === ''} onClick={showPassword} variant="contained" color="primary">Show Password</Button></span>
                    <Button style={{ marginLeft: '0px' }} disabled={credentials.userName === '' || credentials.password === ''} variant="contained" color="primary" onClick={loginClicked}>
                        Login
                </Button>
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