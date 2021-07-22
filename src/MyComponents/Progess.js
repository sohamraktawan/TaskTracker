import React,{useEffect, useState} from "react";
import axios from "axios"
import { useHistory } from "react-router";

function Progess() {
let history = useHistory()
const [user, setUser] = useState()
const [total, settotal] = useState(0)
const [assigned, setassigned] = useState(0)
const [completed, setcompleted] = useState(0)
const [completed_late, setcompleted_late] = useState(0)
const [overdue, setoverdue] = useState(0)

useEffect(() => {
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

    fetch("https://task-tracker9.herokuapp.com/tasks")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => {

      console.log(jsonRes)
      jsonRes.map(task=>{
          if(task.username === user.username && task.status === "assigned"){
            settotal(total=>{return total+1})
            setassigned(total=>{return  total+1})

          }else if(task.username === user.username && task.status==="completed"){
            settotal(total=>{return total+1})
              setcompleted(num=>{
                  return num+1
              })
          }else if(task.username === user.username && task.status==="completed-late"){
              setcompleted_late(num=>{return num+1})
              settotal(total=>{return total+1})
          }

          if(task.username === user.username && task.timeDue-Date.now()<=0 && task.status==="assigned"){
              setoverdue(num=>{return num+1})
              settotal(total=>{return total+1})
          }
      })

    });

}, [])
  return (
    <div>
      <div class="progress">
        <div
          class="progress-bar bg-success"
          role="progressbar"
          style={{width: completed/total*100}}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="progress">
        <div
          class="progress-bar bg-info"
          role="progressbar"
          style={{width: "50%"}}
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="progress">
        <div
          class="progress-bar bg-warning"
          role="progressbar"
          style={{width: "75%"}}
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="progress">
        <div
          class="progress-bar bg-danger"
          role="progressbar"
          style={{width: "100%"}}
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

export default Progess;
