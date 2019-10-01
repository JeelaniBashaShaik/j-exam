import React from 'react';
import RegisterUser from './registerUser';
import LoginUser from './loginUser';

const Home = () => {
    return (
        <div style={{ height: '300px', width: '100%', display: 'grid', gridTemplateColumns: '40% 40%', gridGap: '20px', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <RegisterUser />
            <LoginUser />
        </div>
    )
}
export default Home;