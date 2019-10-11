import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
export default class Question extends React.Component {



    state = {
        selectedOption: '',
        unlockSubmit: false
    };

    static getDerivedStateFromProps(props) {
        return {
            selectedOption: props.question.answer ? props.question.answer : ''
        }
    }

    handleSubmitSwitch = (event) => {
        this.setState({ unlockSubmit: event.target.checked })
    }



    render() {
        const { qid, description, questionOptions } = this.props.question;
        return (
            <div>
                <div><Paper style={{ margin: '20px', padding: '20px' }}><p>{qid}. {description}</p></Paper></div>
                <div><Paper style={{ margin: '20px', padding: '20px' }}>
                    <FormControl component="fieldset" >
                        <div><RadioGroup aria-label="options" name="options" value={this.state.selectedOption === '' ? '' : this.state.selectedOption} onChange={(event) => {console.log(this.state.selectedOption);this.props.optionChange(event.target.value, qid)}}>
                            {
                                questionOptions.length > 0 && questionOptions.map(option => {
                                    return <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                })
                            }
                        </RadioGroup></div>
                    </FormControl></Paper>
                </div>
                <div>
                    <Paper style={{ margin: '20px', padding: '20px' }}>
                        <Button variant="contained" color="primary" disabled={qid === 1} onClick={this.props.previousQuestion}>
                            Previous
                </Button>
                        <Button style={{ marginLeft: '20px' }} variant="contained" color="primary" disabled={(qid === this.props.questionsLength)} onClick={() => this.props.nextQuestion()} >
                            {(qid === this.props.questionsLength) ? 'You\'ve reached the last question' : 'Next'}
                </Button>
                        <FormControlLabel style={{ marginLeft: '20px' }}
                            control={
                                <Switch
                                    checked={this.state.unlockSubmit}
                                    onChange={this.handleSubmitSwitch}
                                    value="checkedB"
                                    color="primary"
                                />
                            }
                            label="Unlock Submit"
                        />
                        <Button style={{ float: 'right' }} variant="contained" color="primary" disabled={!this.state.unlockSubmit} onClick={this.props.submitQuestions} >
                            Submit
                        </Button>
                    </Paper>
                </div></div>
        )
    }
}