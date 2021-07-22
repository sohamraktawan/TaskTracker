import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import Task from './Task'


function Tasks() {
    let history = useHistory();
    const [months, setmonths] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [msg, setmsg] = useState([])
    const[user, setUser] = useState({
      _id:"",
      username:"",
      email:"",
      password:"",
      postsLiked:[],
      postsDisliked:[]
    })
    const [tasks, setTasks] = useState([{
        username:"",
        title:"",
        desc:"",
        timeDue:"",
        priority:"",

    },
  ]);
  
  




  useEffect(() => {
    fetch("https://task-tracker9.herokuapp.com/tasks")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {

        console.log(jsonRes)
        setTasks(jsonRes);
      });


              let token = localStorage.getItem('token');
          if(token){
              axios.post('https://task-tracker9.herokuapp.com/auth', {token:token})
              .then(res=>{
                  if(res.data === false){
                      
                      history.push("/login");
                  }else{
                      console.log("settting")
                      setUser(res.data);
                  }
              })
              .catch((err) =>{
                  console.log(err);
              })
          }
  
  },[]);
    return (
        <div className="tasks">
        <h1 className="today_date">{new Date(Date.now()).getDate()} {months[new Date(Date.now()).getMonth()]} {new Date(Date.now()).getFullYear()}</h1>
        <h4 className="due_today">Tasks Due</h4>
        {tasks.map(task=>{
          
   
      
              if(task.username===user.username && task.status==="assigned" && task.timeDue-Date.now()>0){
                return(
              <Task task={task}/>
              )
          }
          
        })} 
        <h4 className="due_today">Overdue</h4> 
        {tasks.map(task=>{
          
   
      
          if(task.username===user.username && task.timeDue-Date.now()<0 && task.status === "assigned"){
            return(
          <Task task={task}/>
          )
      }
      
    })}
      </div>  
    )
}

export default Tasks
