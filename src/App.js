import logo from './logo.svg';
import './App.css';
import './comp.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import SignUp from './MyComponents/SignUp';
import Tasks from './MyComponents/Tasks'
import CreateTask from './MyComponents/CreateTask';
import Login from './MyComponents/Login';
import Reschedule from "./MyComponents/Reschedule"
import Progress from "./MyComponents/Progess"
import Right from "./MyComponents/Right"
import Completed from './MyComponents/Completed'


function App() {
  return (
    <Router>
      
      <Route exact path = "/">
      <div className="container">
          <SignUp/>
          </div>
      </Route>
      <Route exact path="/home">

        <div className="container1">
          <Tasks/>
          <Right/>
        </div>

      </Route>
      <Route exact path="/create">
        <div className="container1">
          <CreateTask/>
          <Right/>
      </div>

      </Route>
      <Route exact path="/login">
      <div className="container">
          <Login/>
      </div>
      </Route>
      <Route exact path="/reschedule">
        <div className="container1">
        <Reschedule/>
          <Right/>
        </div>

      </Route>
      <Route exact path="/complete">
      <div className="container1">
          <Completed/>
          <Right/>
        </div>
      </Route>
     
    </Router>
  );  
}

export default App;
