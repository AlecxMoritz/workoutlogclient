import React from 'react';
import WorkoutCreate from './WorkoutCreate';
import WorkoutEdit from './WorkoutEdit';
import { Container, Row, Col } from 'reactstrap';
import WorkoutsTable from './WorkoutsTable';
import { AuthContext } from '../auth/AuthContext';

class WorkoutIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            workouts: [],
            updatePressed: false,
            workoutById: 0,
            workoutToUpdate: {}
        };
        
        this.fetchWorkouts = this.fetchWorkouts.bind(this);
        this.updateWorkoutsArray = this.updateWorkoutsArray.bind(this);
        this.workoutDelete = this.workoutDelete.bind(this);
        this.workoutUpdate = this.workoutUpdate.bind(this);
        this.setUpdatedWorkout = this.setUpdatedWorkout.bind(this);
        
    }
    
    componentWillMount() {
        this.fetchWorkouts()
    }
    // fetch get workouts

    fetchWorkouts() {
        console.log(this.props.token)
        fetch('http://localhost:4000/log/all', {
            method: "GET",
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : this.props.auth.sessionToken //using from context
            })
        }).then((res) => res.json())
        .then((logData) => {
            console.log(logData)
            return this.setState({ workouts: logData })
        })
    }

    // delete workout
    workoutDelete(event) {
        localStorage.setItem('deleteId', event.target.id )
        fetch(`http://localhost:4000/log/delete/${localStorage.getItem('deleteId')}`, {
            method: 'DELETE',
            body: JSON.stringify({ log: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : this.props.auth.sessionToken
            })
        })
        .then((res) => {
            this.setState({ updatePressed: false })
            this.fetchWorkouts();
        })
    }

    workoutUpdate(event, workout) {
        fetch(`http://localhost:4000/log/update/${localStorage.getItem('updateId')}`, {
            method: 'PUT',
            body: JSON.stringify({ log: workout }),
            headers: new Headers({
                'Content-Type' : 'application/json',
                'Authorization' : this.props.auth.sessionToken
            })
        })
        .then((res) => {
            this.setState({ updatePressed: false })
            this.fetchWorkouts();
        },
        function(err) {
            console.log(err)
        }
    )
        
    }

   setUpdatedWorkout(event, workout) {
       console.log("Update workout selected. Workout: " + workout.id)
       const idToUpdate = workout.id;
        localStorage.setItem('updateId', workout.id);

       this.setState({
           workoutToUpdate: workout,
           updatePressed: true
        })
        console.log(idToUpdate)
        return idToUpdate;
    }

   updateWorkoutsArray() {
       this.fetchWorkouts()
   }


    render(){
        const workouts = this.state.workouts.length >= 1 ? 
        <WorkoutsTable workouts={this.state.workouts} token={this.props.token} delete={this.workoutDelete} update={this.setUpdatedWorkout} /> :
        <h2> Log a workout to see the table</h2>
                    return(

            <Container>
                <Row>
                    <Col md="3">
                        <WorkoutCreate token={this.props.token} updateWorkoutsArray={this.updateWorkoutsArray} workoutId={this.state.workoutById} updatePressed={this.state.updatePressed} />
                    </Col>
                    <Col md="9">
                        {workouts}
                    </Col>
                </Row>
                <Col md="12">
                    {
                        this.state.updatePressed ? <WorkoutEdit t={this.state.updatePressed} update={this.workoutUpdate} workout={this.state.workoutToUpdate} id={this.setUpdatedWorkout.id}/> : <div></div>
                    }
                </Col>
            </Container>
        )
    }
}      


export default props => (
    <AuthContext.Consumer>
        {auth => <WorkoutIndex {...props} auth={auth} />}
    </AuthContext.Consumer>
)