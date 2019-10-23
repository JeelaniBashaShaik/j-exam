import React from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import axios from './../axiosProxy';
import Config from './../config';
class Landing extends React.Component {

    state = {
        allExams: [],
        canRedirect: false
    }

    async componentDidMount() {
        const { data } = await axios.get(`${Config.baseUrl}/exam/fetchAllExams`);
        this.setState({ allExams: data.payload })
    }

    setExamId = (examId) => {
        localStorage.setItem('incExamEid', examId);
        this.setState({ canRedirect: true });
    }

    render() {
        return (
            <div>
                {
                    this.state.allExams.length > 0 &&
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', margin: '10px', gridGap: '10px' }}>
                        {
                            this.state.allExams.map(exam => {
                                let imgPath = '';
                                if (exam.family === 'HTML') {
                                    imgPath = './html.png';
                                } else if (exam.family === 'Javascript') {
                                    imgPath = './js.png'
                                } else if (exam.family === 'CSS') {
                                    imgPath = './css.png'
                                } else if (exam.family === 'ES6') {
                                    imgPath = './es6.png'
                                } else if (exam.family === 'Core Java') {
                                    imgPath = './java.png'
                                } else if (exam.family === 'Spring') {
                                    imgPath = './spring.png'
                                }
                                return (
                                    <div key={exam.eid}>
                                        {/* <Link to={`/questionPaper/${exam.eid}`}> */}
                                        <Paper style={{ padding: '20px', cursor: 'pointer' }} onClick={() => this.setExamId(exam.eid)}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <span>{exam.family}</span><span>- {exam.eid}</span>
                                                        <div>{exam.description}</div>
                                                    </div>
                                                    <img src={imgPath} height="100" width="75" />
                                                </div>

                                            </div>
                                        </Paper>
                                        {/*     </Link> */}
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    !this.state.allExams.length > 0 &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100%' }}>
                        <div>
                            <CircularProgress />
                            <p>Fetching list of exams...</p>
                        </div>
                    </div>
                }
                {
                    this.state.canRedirect && <Redirect to="/questionPaper" />
                }

            </div>

        )
    }
}

export default Landing;