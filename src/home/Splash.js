import React from 'react';
import WorkoutIndex from '../workouts/WorkoutIndex';

class Splash extends React.Component {

    render() {
    return (
            <div>
                {/* <img src="https://i.pinimg.com/originals/d6/9a/c4/d69ac4a242d6c306facc543ebf536d00.jpg" alt="splash page" /> */}
                <h2><center>Welcome, {localStorage.getItem('username')} !</center></h2>
                <WorkoutIndex token={this.props.sessionToken}/>
            </div>
        ) 
    }
}

export default Splash;