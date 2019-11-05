import React from 'react';
import axios from './../axiosProxy';
import Config from './../config';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class CompletedExams extends React.Component {
    
    state = {
        completedExams: [],
        canRedirectToResult: false
    }
    
    componentDidMount() {
        this.fetchCompletedExams();
    }
    
    fetchCompletedExams = async () => {
        const requestBody = { userName: localStorage.getItem('incExamUserName') };
        const {data} = await axios.post(`${Config.baseUrl}/result/fetchCompletedExams`, requestBody);
        if (data.result === 'success') {
            this.setState({completedExams: data.payload});
        }
    }

    render () {
        return (
            <div>
                {this.state.completedExams.length && 
                <Grid style={{padding:'20px'}} container spacing={3}>{this.state.completedExams.map(exam => {
                    const date = new Date(Number(exam.lastAttemptDate)).toLocaleDateString();
                    console.log(date);
                    const percent = (exam.correctCount/(exam.correctCount + exam.wrongCount)) * 100;
                    console.log(percent);
                    return (
                       
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    
                            <Card>
                                
                                <CardContent>
                                <div style={{display:'flex',justifyContent: 'space-between'}}>
                                    <div>
                                    <div style={{color:'blue', fontSize:'20px'}}>{exam.description}</div>
                                    <div>Attempt: {date}</div>
                                    </div>
                                    <div>
                                        {percent >= 60 && <div style={{color:'green', fontSize:'36px', fontWeight:100}}>{percent.toFixed(2) + '%'}</div> }
                                        {percent >= 40 && percent < 60 && <div style={{color:'yellow', fontSize:'36px', fontWeight:100}}>{percent.toFixed(2) + '%'}</div> }
                                        {percent < 40 && <div style={{color:'red', fontSize:'36px', fontWeight:100}}>{percent.toFixed(2) + '%'}</div> }
                                    </div>
                                </div>
                               
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => {
                                        localStorage.setItem('incExamEid', exam.eid);
                                        this.setState({canRedirectToResult: true});
                                    }}>View Full Result</Button>
                                </CardActions>
                            </Card>
                         
                            </Grid>
                    )
                })}</Grid>
                }
                {this.state.canRedirectToResult && <Redirect to="/result" />}
            </div>
        )
    }
}