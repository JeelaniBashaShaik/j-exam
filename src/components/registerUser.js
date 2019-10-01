import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Config from './../config';

const RegisterUser = () => {

    const registerClicked = async () => {
        const { data } = await axios.post(`${Config.baseUrl}/user/register`, user);
        const { registered, message } = data;
        if (registered) {
            setUser({ userName: '', password: '', email: '', phone: '' });
            setSnackBar({ showSnackbar: true, snackBarMessage: message, snackBarColor: 'green' });
        } else {
            setSnackBar({ showSnackbar: true, snackBarMessage: message, snackBarColor: 'red' });
        }
    }

    const showPassword = () => {
        const elem = document.getElementById('pwd-register');
        setTimeout(() => {
            elem.setAttribute('type', 'password');
        }, 500);
        elem.setAttribute('type', 'text');
    }

    const initialUser = { userName: '', password: '', email: '', phone: '' };
    const snackBarInitial = { showSnackbar: false, snackBarColor: 'black', snackBarMessage: '' };
    const [user, setUser] = React.useState(initialUser);
    const [snackBar, setSnackBar] = React.useState(snackBarInitial);
    return (
        <Paper style={{ display: 'flex', justifyContent: 'center', margin: '40px', padding: '20px' }}>
            <div>
                <h3>Register</h3>
                <TextField
                    id="userName-register"
                    label="User Name"
                    value={user.userName}
                    onChange={(event) => setUser({ ...user, userName: event.target.value })}
                    margin="normal"
                    fullWidth
                    style={{ marginTop: '0px' }}
                />
                <span><TextField
                    id="pwd-register"
                    label="Password"
                    value={user.password}
                    onChange={(event) => setUser({ ...user, password: event.target.value })}
                    margin="normal"

                    type="password"
                    style={{ marginTop: '0px', width: '65%' }}
                /><Button style={{ marginTop: '10px', marginLeft: '10px' }} disabled={user.password === ''} onClick={showPassword} variant="contained" color="primary">Show Password</Button></span>
                <TextField
                    id="email-register"
                    label="Email"
                    value={user.email}
                    onChange={(event) => setUser({ ...user, email: event.target.value })}
                    margin="normal"
                    fullWidth
                    style={{ marginTop: '0px' }}
                />
                <TextField
                    id="phone-register"
                    label="Phone Number"
                    value={user.phone}
                    onChange={(event) => setUser({ ...user, phone: event.target.value })}
                    margin="normal"
                    fullWidth
                    style={{ marginTop: '0px' }}
                />
                <Button disabled={user.userName === '' || user.email === '' || user.password === '' || user.phone === ''} variant="contained" color="primary" onClick={registerClicked}>
                    Register
                </Button>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackBar.showSnackbar}
                autoHideDuration={5000}
                onClose={() => setSnackBar({ ...user, showSnackbar: false })}
            >
                <SnackbarContent aria-describedby="client-snackbar" style={{ backgroundColor: snackBar.snackBarColor }} message={snackBar.snackBarMessage} />
            </Snackbar>
        </Paper>
    )
}


export default RegisterUser;