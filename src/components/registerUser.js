import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import Config from './../config';
import { RemoveRedEye } from '@material-ui/icons';
import './register.css';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
const RegisterUser = () => {

    const registerClicked = async () => {
        const { data } = await axios.post(`${Config.baseUrl}/user//register`, user);
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
        /* <Paper style={{ display: 'flex', justifyContent: 'center', margin: '40px', padding: '20px' }}>
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
        </Paper> */
       /*  <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
    abca
        </Grid>
        <Grid container item xs={12} spacing={3}>
dsfer   
        </Grid>
        <Grid container item xs={12} spacing={3}>
4687
        </Grid>
      </Grid> */
      <Paper id="registerPaper">
      <div id="registerUserPage">
            <div id="registerForm">
            <div id="registration">
                    <TextField
                        id="userName-register"
                        label="User Name"
                        value={user.userName}
                        onChange={(event) => setUser({ ...user, userName: event.target.value })}
                        margin="normal"
                        fullWidth
                        style={{ marginTop: '15px' }}
                    />
                    <div style={{display:'grid', gridTemplateColumns:'90% 10%'}}><TextField
                        id="pwd-register"
                        label="Password"
                        value={user.password}
                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                        margin="normal"

                        type="password"
                        style={{ marginTop: '0px' }}
                    />
                    <IconButton disabled={user.password === ''} onClick={showPassword}>
                        <RemoveRedEye />
                    </IconButton>
                    </div>
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
                    <div style={{marginTop:'15px',marginBottom:'20px', textAlign:'center'}}><Button  disabled={user.userName === '' || user.email === '' || user.password === '' || user.phone === ''} variant="contained" color="primary" onClick={registerClicked}>
                        Register
                    </Button></div>
                </div>
            </div>
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