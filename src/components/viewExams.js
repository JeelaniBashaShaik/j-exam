import React from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import axios from './../axiosProxy';
import Config from './../config';

class ViewExams extends React.Component {

    state = {
        allExams: [],
        canRedirect: false,
        snackBarColor: '',
        snackBarMessage: '',
        showSnackbar: false,
        currentExamQuestions: []
    }

    componentDidMount() {
        this.fetchExams();    
    }

    fetchExams = async () => {
        const { data } = await axios.get(`${Config.baseUrl}/exam/fetchAllExams`);
        this.setState({ allExams: data.payload })
    }

    deleteExam = async (eid) => {
        const { data } = await axios.post(`${Config.baseUrl}/exam/deleteExam`, {eid:eid});
        if (data.result === 'success') {
            this.setState({ showSnackbar: true, snackBarColor: 'green', snackBarMessage: 'Deleted successfully'});
            this.fetchExams();    
        } else {
            this.setState({ showSnackbar: true, snackBarColor: 'red', snackBarMessage: 'Error occured while deleting exam'});
        }
        
    }

    viewQuestions = async (examId) => {
        const { data } = await axios.get(`${Config.baseUrl}/question/fetchQuestions/${examId}`);
        this.setState({currentExamQuestions:data.payload });
    }

    render() {
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90vh', width:'100%'}}>
                {
                    !this.state.allExams.length > 0 &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100%' }}>
                        <div>
                            <CircularProgress />
                            <p>Fetching list of exams...</p>
                        </div>
                    </div>
                }
               
               <div style={{ height: '500px', overflowY: 'auto', padding: '5px', width:'70%' }}> {
                            this.state.allExams.length > 0 && this.state.allExams.map(item => {
                                return (
                                    <ExpansionPanel style={{ margintop: '3px' }} key={item.eid}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <div>
                                                    {item.eid} {item.description}
                                                </div>
                                                <div>
        
                                                </div>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                           {/*  <Typography> */}
                                            <div>
                                            <Button style={{ marginTop: '10px', marginLeft: '10px' }} onClick={()=>this.deleteExam(item.eid)} variant="contained" color="primary">Delete Exam</Button>
                                       {/*      <Button style={{ marginTop: '10px', marginLeft: '10px' }} onClick={()=>this.viewQuestions(item.eid)} variant="contained" color="primary">View Questions</Button> */}
                                            </div>
                                            {
                                                this.state.currentExamQuestions.length > 0 && <div>
                                                    {
                                                        this.state.currentExamQuestions.map(question => {
                                                            return (
                                                                <div key={question.qid}>
                                                                    <span>{question.qid}</span><span>{question.description}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            }

                                           {/*  </Typography> */}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })


                        }
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

            </div>

        )
    }
}

export default ViewExams;