import React from 'react';
import Question from './question';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Config from './../config';

export default class QuestionPaper extends React.Component {
    state = {
        questions: [
        ],
        currentQuestion: undefined,
        currentQuestionIndex: 0,
        canNavigateToResult: false,
        eid: '',
        showProgress: false,
        hasPreviousResult: false,
        previousResult: {},
        showSnackbar: true
    }

    async componentDidMount() {
        const examId = localStorage.getItem('incExamEid');
        const userName = localStorage.getItem('incExamUserName');
        this.setState({ eid: examId, userName });
        const { data: resultData } = await axios.post(`${Config.baseUrl}/result/fetchResult`, { userName, eid: examId });
        if (resultData.result === 'success' && resultData.payload.length > 0) {
            this.setState({ hasPreviousResult: true, previousResult: resultData.payload[0] });
        } else {
            const { data } = await axios.get(`${Config.baseUrl}/question/fetchQuestions/${examId}`);
            const newData = data.payload.map(question => {
                let newQuestion = { ...question, questionOptions: [question.option1, question.option2, question.option3, question.option4] };
                return newQuestion;
            })
            this.setState({ currentQuestion: newData[0], questions: newData })
        }

    }

    previousQuestion = () => {
        const currentQuestionIndex = this.state.currentQuestionIndex - 1;
        this.setState({ currentQuestionIndex: currentQuestionIndex, currentQuestion: this.state.questions[currentQuestionIndex] })
    }

    nextQuestion = () => {
        const currentQuestionIndex = this.state.currentQuestionIndex + 1;
        this.setState({ currentQuestionIndex: currentQuestionIndex, currentQuestion: this.state.questions[currentQuestionIndex] });
    }

    optionChange = (selectedOption, questionNumber) => {
        const newQuestions = [...this.state.questions];
        newQuestions[questionNumber - 1]['answer'] = selectedOption;
        this.setState({ questions: newQuestions })
    }

    submitQuestions = async () => {
        const questions = this.state.questions;
        const name = localStorage.getItem('incExamUserName');
        let requestBody = {};
        const answers = questions.map(question => {
            return { qid: question.qid, answer: question.answer }
        });
        requestBody.eid = this.state.eid;
        requestBody.userName = name;
        requestBody.answers = answers;
        this.setState({ showProgress: true })
        const response = await axios.post(`${Config.baseUrl}/result/submit`, requestBody);
        if (response && response.data) {
            this.setState({ canNavigateToResult: true });
        }
    }

    deletePreviousResult = async () => {
        const requestBody = { eid: this.state.eid, userName: this.state.userName };
        const { data } = await axios.post(`${Config.baseUrl}/result/deleteResult`, requestBody);
        if (data.result === 'success') {
            const { data } = await axios.get(`${Config.baseUrl}/question/fetchQuestions/${this.state.eid}`);
            const newData = data.payload.map(question => {
                let newQuestion = { ...question, questionOptions: [question.option1, question.option2, question.option3, question.option4] };
                return newQuestion;
            })
            this.setState({ currentQuestion: newData[0], questions: newData, hasPreviousResult: false })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.showProgress && <div>{
                        this.state.currentQuestion !== undefined &&
                        <Question question={this.state.currentQuestion}
                            nextQuestion={this.nextQuestion} previousQuestion={this.previousQuestion}
                            optionChange={this.optionChange}
                            questionsLength={this.state.questions.length}
                            submitQuestions={this.submitQuestions} />}</div>
                }
                {this.state.showProgress &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100%' }}>
                        <div>
                            <CircularProgress />
                            <p>Fetching Result...</p>
                        </div>
                    </div>
                }
                {
                    this.state.canNavigateToResult && <Redirect to="/result" />
                }
                {
                    this.state.hasPreviousResult &&
                    <div>
                        <h3>You have already attemped this exam. Would you like to see those results ?</h3>
                        <Link to="/result"><Button style={{ marginLeft: '10px' }} variant="contained" color="primary">Yes, show me result</Button></Link>
                        <Button onClick={this.deletePreviousResult} style={{ marginLeft: '10px' }} variant="contained" color="primary">Rewrite exam</Button>
                    </div>
                }
            </div>

        )
    }
}