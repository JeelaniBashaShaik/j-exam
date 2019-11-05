import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';
import './home.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

const Home = () => {
    const [value, setValue] = React.useState(0);
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Paper id="homePaper">
      <div id="homepage">
            <div id="homepageImage">
                 <img src="./student.jpg" height="300px" width="200px" height="auto" alt="girl writing exam"/> 
            </div>
            <div id="registerForm">
            <div id="registration">
            <AppBar position="static">
          <Tabs  value={value}  centered
            onChange={(event, value) => setValue(value)}>
            <Tab aria-label="Register" label="Register"/>
            <Tab aria-label="Login" label="Login" />
          </Tabs>
        </AppBar>
        <TabPanel  value={value} index={0}>
            <RegisterUser />    
        </TabPanel>
        <TabPanel  value={value} index={1}>
          <LoginUser />
        </TabPanel>
            </div>
            </div>
                  
      </div>
      </Paper>
      </div>
      
    )
}
export default Home;