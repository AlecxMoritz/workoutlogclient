import React, { Component } from 'react';
import './App.css';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import WorkoutIndex from './workouts/WorkoutIndex'
import { AuthContext } from './auth/AuthContext';

class App extends Component {
  constructor() {
    super();
    this.setToken = (token) => {
      localStorage.setItem('token', token);
      this.setState({ sessionToken: token });
    }

    this.state = {
      sessionToken: '',
      setToken: this.setToken,
    }
    this.setSessionState = this.setSessionState.bind(this);
    this.logout = this.logout.bind(this);
    this.modifyProfileImage = this.modifyProfileImage.bind(this);
  }

  setSessionState(token) {
    localStorage.setItem('token', token);
      // stores it locally so we don't have to sign in when we refresh the page
    
    this.setState({ sessionToken: token })
  }

  protectedViews = () => {
    if( this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
          <WorkoutIndex />
              </Route>
            </Switch>
      )
    } else {
      return (
        <Route>
            <Auth /> 
        </Route>
      )
    }
  }


  componentWillMount() {
    const token = localStorage.getItem('token')

    if(token &&!this.state.sessionToken) {
        this.setState({ sessionToken: token });
      if(localStorage.getItem('profileImage')) {
        this.setState({profileImage: localStorage.getItem('profileImage') } )
    }
  }

}

  logout() {
    this.setState({
      sessionToken: '',
      profileImage: ''
    })
    localStorage.clear();
    // window.location.reload();
  }

  modifyProfileImage(imgUrl){
    this.setState({
      profileImage: imgUrl
    });
    localStorage.setItem('profileImage', imgUrl);
  }

  render() {
    return (
      <Router>
        <AuthContext.Provider value={this.state}>
          <div>
            <SiteBar clickLogout={this.logout}/>  
            {this.protectedViews()}
          </div>
        </AuthContext.Provider>
      </Router> 
    );
  }
}

export default App;
