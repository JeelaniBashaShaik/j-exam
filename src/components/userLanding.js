import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './userLanding.css';

export default class userLanding extends React.Component {

    componentDidMount() { }
    render() {
        const userName = localStorage.getItem('incExamUserName');
        return (
            /* <div>
                {
                    userName === 'admin987' && <Redirect to="/admin" />
                }
                {
                    userName !== 'admin987' && <Redirect to="/tests" />

                }
            </div> */
            <div id="userLanding">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Link to="/tests">
                        <Card>
                            
                            <CardContent>
                            
                            <Typography style={{color:'black'}}>
                              Write Tests
                            </Typography>
                           
                            </CardContent>
                            
                        </Card>
                        </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Link to="/completedExams">
                        
                        <Card>
                            <CardContent>
                            <Typography>
                                Previous Tests Results                                
                            </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                        <Card>
                            <CardContent>
                            <Typography>
                                Favourite Questions
                            </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                   
                </Grid>
            </div>
            
        )
    }
}