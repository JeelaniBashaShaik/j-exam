import React from 'react';
import Paper from '@material-ui/core/Paper';
import ReactEcharts from 'echarts-for-react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import Axios from 'axios';
import Config from './../config';
export default class Result extends React.Component {

    state = {
        correctPercent: 0,
        wrongPercent: 0,
        finalResult: []
    }

    getOption = () => {
        const option = {
            title: {
                text: `Result`,
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['Wrong %', 'Correct %']
            },
            calculable: true,
            series: [
                {
                    name: 'Result',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: this.state.wrongPercent, name: 'Wrong %', itemStyle: {color: 'red'} },
                        { value: this.state.correctPercent, name: 'Correct %', itemStyle: {color: 'green'} }
                    ]
                }
            ]
        };
        return option;
    }

    async componentDidMount() {
        let requestBody = { userName: localStorage.getItem('incExamUserName'), eid: localStorage.getItem('incExamEid') }
        const { data } = await Axios.post(`${Config.baseUrl}/result/fetchResult`, requestBody);
        this.setState({ userName:data.payload[0].userName, description:data.payload[0].description ,finalResult: data.payload[0].finalResult, correctPercent: data.payload[0].correctCount, wrongPercent: data.payload[0].wrongCount, correctCount: data.payload[0].correctCount, wrongCount: data.payload[0].wrongCount, totalCount: data.payload[0].correctCount + data.payload[0].wrongCount });
    }

    render() {
        let percentage = ((this.state.correctCount / this.state.totalCount) * 100).toFixed(2);
        return (
            <div>

                <div style={{ height: '80vh', width: '100%', display: 'grid', padding: '20px', boxSizing: 'border-box', gridTemplateColumns: '40% 59%', gridGap: '1%' }}>
                    <Paper style={{ padding: '20px' }}>
                        <div style={{display:'flex', justifyContent: 'space-between'}}>
                            <div>
                            {this.state.userName && <p>User Name: {this.state.userName}</p>}
                            {this.state.eid && <p>Exam Id: {this.state.eid}</p>}
                            {this.state.description && <p>Exam Description: {this.state.description}</p>}
                            {this.state.correctCount && <p>Correct Count: {this.state.correctCount}</p>}
                            {this.state.wrongCount && <p>Wrong Count: {this.state.wrongCount}</p>}
                            {this.state.totalCount && <p>Total Questions: {this.state.totalCount}</p>}
                            </div>
                            <div>
                                {this.state.totalCount && <div>
                                    <p>Percentage</p>
                                    <div style={{fontSize:'48px', fontWeight:100, color: `${percentage >= 60 ? 'green' : percentage < 60 ? 'red' : 'black'}` }}>{percentage}  %</div>
                                </div>}
                            </div>
                            
                            
                        </div>
                        <hr />
                        <ReactEcharts option={this.getOption()} />
                    </Paper>
                    <Paper style={{ padding: '20px' }}>
                        <div style={{ height: '500px', overflowY: 'auto', padding: '5px' }}> {
                            this.state.finalResult.length > 0 && this.state.finalResult.map(item => {
                                return (
                                    <ExpansionPanel style={{ margintop: '3px' }} key={item.qid}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                <div>
                                                    {item.qid} {item.description}
                                                </div>
                                                <div>
                                                    {item.isCorrect ? <DoneOutlineIcon style={{ color: 'green' }} /> : <CancelOutlined style={{ color: 'red' }} />}
                                                </div>
                                            </div>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>
                                                <span style={{ display: 'block' }}>Actual Answer: <span >{item.correctAnswer}</span>,</span>
                                                <span style={{ display: 'block' }}>Your Answer: <span style={{ color: `${item.isCorrect ? 'green' : 'red'}` }}>{item.yourAnswer}</span></span>

                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })


                        }

                        </div>
                    </Paper>


                </div>

            </div>
        )
    }
}