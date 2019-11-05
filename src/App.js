import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import QuestionPaper from './containers/questionPaper';
import CreateQuestions from './components/createQuestion';
import TestsLanding from './components/testsLanding';
import CreateExam from './components/createExam';
import Home from './components/home';
import UserLanding from './components/userLanding';
import ViewExams from './components/viewExams';
import Result from './containers/result';
import AdminPage from './components/admin';
import Results from './components/results';
import NotGenuine from './components/notGenuine';
import Config from './config';
import jwt from 'jsonwebtoken';
import CompletedExams from './components/completedExams';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



function App() {
  const classes = useStyles();
  function isAuthenticatedFunc() {
    const token = localStorage.getItem('incExamAccessToken');
    try {
      jwt.verify(token, Config.jwtSecret);
      return true;
    } catch (error) {
      return false;
    }
  }
  function logout() {
    localStorage.removeItem('incExamUserName');
    localStorage.removeItem('incExamAccessToken');
    localStorage.removeItem('incExamEid');
  }
  return (
    <Provider store={store}>
      <div className={classes.root}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" className={classes.title}>
                <Link to="/">J-Exam</Link>
              </Typography>
              {
                /* isAuthenticatedFunc() && <div style={{ cursor: 'pointer' }} onClick={logout}>Logout</div> */
              }
            </Toolbar>
          </AppBar>
          <Route path="/" exact component={Home} />
          <Route path="/tests" exact render={() => isAuthenticatedFunc() ? <TestsLanding /> : <NotGenuine />} />
          <Route path="/createQuestions" exact render={() => isAuthenticatedFunc() ? <CreateQuestions /> : <NotGenuine />} />
          <Route path="/questionPaper" render={() => isAuthenticatedFunc() ? <QuestionPaper /> : <NotGenuine />} />
          <Route path="/createExam" exact render={() => isAuthenticatedFunc() ? <CreateExam /> : <NotGenuine />} />
          <Route path="/home" exact component={Home} />
          <Route path="/userLanding/:userName" render={() => isAuthenticatedFunc() ? <UserLanding /> : <NotGenuine />} />
          <Route path="/result" exact render={() => isAuthenticatedFunc() ? <Result /> : <NotGenuine />} />
          <Route path="/results" exact render={() => isAuthenticatedFunc() ? <Results /> : <NotGenuine />} />
          <Route path="/admin" exact render={() => isAuthenticatedFunc() ? <AdminPage /> : <NotGenuine />} />
          <Route path="/viewExams" exact render={() => isAuthenticatedFunc() ? <ViewExams /> : <NotGenuine />} />
          <Route path="/completedExams" exact render={() => isAuthenticatedFunc() ? <CompletedExams /> : <NotGenuine />} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
