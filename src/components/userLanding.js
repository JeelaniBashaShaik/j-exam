import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

export default class userLanding extends React.Component {

    componentDidMount() { }
    render() {
        const userName = localStorage.getItem('incExamUserName');
        return (
            <div>
                {
                    userName === 'admin987' &&
                    <div style={{ display: 'grid', gridTemplateColumns: '20% 20% 20% 20% 20%' }}>
                        <Link to="/createExam"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>Create Exam</h3>
                        </Paper></Link>
                        <Link to="/createQuestions"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>Create Questions</h3>
                        </Paper></Link>
                        <Link to="/results"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>Results</h3>
                        </Paper></Link>
                    </div>
                }
                {
                    userName !== 'admin987' && <Redirect to="/tests" />

                }
            </div>
        )
    }
}