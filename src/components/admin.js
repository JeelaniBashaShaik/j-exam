import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import axios from './../axiosProxy';
import Config from './../config';


export default class AdminPage extends React.Component {
    
    async componentDidMount() {
        const { data } = await axios.get(`${Config.baseUrl}/exam/fetchAllExams`);
        this.setState({ allExams: data.payload })
    }

    render() {
        return (
             <div style={{ display: 'grid', gridTemplateColumns: '20% 20% 20% 20% 20%' }}>
                        <Link to="/createExam"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>Create Exam</h3>
                        </Paper></Link>
                        <Link to="/createQuestions"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>Create Questions</h3>
                        </Paper></Link>
                        <Link to="/viewExams"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>View Exams</h3>
                        </Paper></Link>
                        <Link to="/results"><Paper style={{ margin: '20px', padding: '20px' }}>
                            <h3 style={{ textAlign: 'center' }}>Results</h3>
                        </Paper></Link>
                    </div>
        )
    }
}