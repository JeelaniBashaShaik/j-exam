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
export default class CreateQuestions extends React.Component {

    state = {
        questionType: '',
        questionDescription: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        examId: '',
        availableTests: ['HTML', 'CSS', 'Javascript', 'Core Java', 'Spring', 'ES6'],
        availableExams: [],
        questionId: '',
        answer: '',
        showSnackbar: false,
        snackBarColor: 'black',
        snackBarMessage: ''
    };

    saveQuestion = async () => {
        const requestBody = {
            description: this.state.questionDescription,
            qid: this.state.questionId,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            answer: this.state.answer,
            eid: this.state.examId
        }
        const { data } = await axios.post(`${Config.baseUrl}/question/createQuestion`, requestBody);
        if (data.result === 'success') {
            this.setState({
                showSnackbar: true,
                snackBarColor: 'green',
                snackBarMessage: data.payload.message,
                questionType: '',
                questionDescription: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                examId: '',
                questionId: '',
                answer: '',
            });
        } else {
            this.setState({
                showSnackbar: true,
                snackBarColor: 'red',
                snackBarMessage: data.payload,
            })
        }
    }

    async componentDidMount() {
        const { data } = await axios.get(`${Config.baseUrl}/exam/fetchAllExams`);
        this.setState({ availableExams: data.payload });
    }

    render() {
        return (
            <div>
                <div>
                    <Paper style={{ margin: '20px', padding: '20px' }}>
                        <InputLabel htmlFor="question-family">Exam</InputLabel>
                        <Select
                            value={this.state.examId ? this.state.examId : ''}
                            onChange={(event) => this.setState({ examId: event.target.value, })}
                            inputProps={{
                                name: 'Question Family',
                                id: 'question-family',
                            }}
                            style={{ width: '200px' }}
                        > {
                                this.state.availableExams.map(test => <MenuItem key={test.eid} value={test.eid}>{test.family} - {test.eid}</MenuItem>)
                            }
                        </Select>

                        <TextField
                            id="questionDescription"
                            label="Description"
                            value={this.state.questionDescription}
                            onChange={(event) => this.setState({ questionDescription: event.target.value })}
                            margin="normal"
                            fullWidth
                        />
                    </Paper>
                </div>
                <Paper style={{ margin: '20px', padding: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '20px' }}>
                        <div>
                            <TextField
                                id="option1"
                                label="Option 1"
                                value={this.state.option1}
                                onChange={(event) => this.setState({ option1: event.target.value })}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                id="option2"
                                label="Option 2"
                                value={this.state.option2}
                                onChange={(event) => this.setState({ option2: event.target.value })}
                                margin="normal"
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                id="option3"
                                label="Option 3"
                                value={this.state.option3}
                                onChange={(event) => this.setState({ option3: event.target.value })}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                id="option4"
                                label="Option 4"
                                value={this.state.option4}
                                onChange={(event) => this.setState({ option4: event.target.value })}
                                margin="normal"
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                id="qid"
                                label="Question Id"
                                value={this.state.questionId}
                                onChange={(event) => this.setState({ questionId: event.target.value })}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                id="answer"
                                label="Answer"
                                value={this.state.answer}
                                onChange={(event) => this.setState({ answer: event.target.value })}
                                margin="normal"
                                fullWidth
                            />
                        </div>
                    </div>
                    <br />
                    <Button style={{ marginLeft: '20px' }} variant="contained" color="primary" onClick={this.saveQuestion}>
                        Save
                </Button>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showSnackbar}
                    autoHideDuration={5000}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"

                            onClick={() => this.setState({ showSnackbar: false })}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    onClose={() => this.setState({ showSnackbar: false })}
                >
                    <SnackbarContent aria-describedby="client-snackbar" style={{ backgroundColor: this.state.snackBarColor }} message={this.state.snackBarMessage} />
                </Snackbar>

            </div>
        )
    }
}