import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Task(props) {
  const [months, setmonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [msg, setmsg] = useState("complete");
  const [task, settask] = useState(props.task);
  const [taskStyle, settaskStyle] = useState({ color: "white" });
  let date = new Date(task.timeDue).getDate();
  let month = months[new Date(task.timeDue).getMonth()];
  let year = new Date(task.timeDue).getFullYear();
  let hours = new Date(task.timeDue).getHours();
  let minutes = new Date(task.timeDue).getMinutes();

  function timeSince(date) {
    var seconds = Math.floor((task.timeDue - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  useEffect(() => {
    if (task.priority === "high") {
      settaskStyle({ color: "red" });
    }
    if (task.priority === "moderate") {
      settaskStyle({ color: "orange" });
    }
    if (task.priority === "low") {
      settaskStyle({ color: "" });
    }
  }, []);

  const complete = () => {
    //css changes
    setmsg("Completed");
    settaskStyle({ color: "green" });
    let upobj = {
      id: task._id,
    };
    axios
      .post("http://localhost:3001/complete", upobj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete= ()=>{
    const upobj = {
      id:task._id
    }
      axios.post("http://localhost:3001/delete", upobj)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
          console.log(err)
      })
  }

  return (
    <div className="task">
      <h2 className="task_title" style={taskStyle}> Title : {task.title} <div className="task_dueDate">
        Due on {date} {month} {year} at {hours}:{minutes}
      </div></h2>
      <h4 className="task_desc" style={taskStyle}>Desc : {task.desc} <div className="task_dueTime">Due in {timeSince(Date.now())}</div></h4>
      {/* <div>Due on {timeArr.map(time=>{
                return(
                    <span>{}</span>
                )
            })}</div> */}

      
      <div className="task_prior" style={taskStyle}>Priority : {task.priority}</div>
      <div className="buttons_container">
        <button className="complete_button" onClick={complete}>{msg}</button>
        <button className="reschedule_button" onClick={handleDelete}>



          <Link
            className="reschedule_link"
            to={{
              pathname: "/reschedule",
              state: {
                title:task.title,
                desc:task.desc

              },
            }}
          >Reschdule</Link>
        </button>
      </div>
    </div>
  );
}

export default Task;
