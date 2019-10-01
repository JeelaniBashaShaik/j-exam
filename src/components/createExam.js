import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Config from './../config';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
export default class CreateExam extends React.Component {

    state = {
        examFamily: '',
        examDescription: '',
        examId: 0,
        availableTests: ['HTML', 'CSS', 'Javascript', 'Core Java', 'Spring', 'ES6'],
        showSnackbar: false,
        snackBarColor: 'black',
        snackBarMessage: ''
    }

    saveExam = async () => {
        const response = await axios.post(`${Config.baseUrl}/exam/createExam`, { family: this.state.examFamily, eid: this.state.examId, description: String(this.state.examDescription) })
        if (response.data.result === 'success') {
            this.setState({ showSnackbar: true, snackBarMessage: response.data.payload.message, snackBarColor: 'green' });
            this.setState({ examId: 0, examFamily: '', examDescription: '' })
        } else {
            this.setState({ showSnackbar: true, snackBarMessage: response.data.payload, snackBarColor: 'red' })
        }
    }
    render() {
        return (
            <div>
                <Paper style={{ margin: '20px', padding: '20px' }}>
                    <div style={{ display: 'grid', width: '100%', gridTemplateColumns: '15% 10% 65% 10%', gridGap: '10px' }}>
                        <div>
                            <InputLabel htmlFor="question-family">Question Family</InputLabel>
                            <Select
                                value={this.state.examFamily ? this.state.examFamily : ''}
                                onChange={(event) => this.setState({ examFamily: event.target.value })}
                                inputProps={{
                                    name: 'Question Family',
                                    id: 'question-family',
                                }}
                                style={{ width: '200px' }}
                            > {
                                    this.state.availableTests.map(testName => <MenuItem key={testName} value={testName}>{testName}</MenuItem>)
                                }
                            </Select>
                        </div>
                        <div>
                            <TextField
                                id="examId"
                                label="Exam Id"
                                value={this.state.examId}
                                onChange={(event) => this.setState({ examId: event.target.value })}
                                margin="normal"
                                fullWidth
                                style={{ marginTop: '0px' }}
                            />
                        </div>
                        <div>
                            <TextField
                                id="examDescription"
                                label="Description"
                                value={this.state.examDescription}
                                onChange={(event) => this.setState({ examDescription: event.target.value })}
                                margin="normal"
                                fullWidth
                                style={{ marginTop: '0px' }}
                            />
                        </div>
                        <div>
                            <Button style={{ marginLeft: '20px' }} variant="contained" color="primary" onClick={this.saveExam}>
                                Save
                </Button>
                        </div>
                    </div>


                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showSnackbar}
                    autoHideDuration={5000}
                    onClose={() => this.setState({ showSnackbar: false })}
                >
                    <SnackbarContent aria-describedby="client-snackbar" style={{ backgroundColor: this.state.snackBarColor }} message={this.state.snackBarMessage} />
                </Snackbar>
            </div>
        )
    }
}