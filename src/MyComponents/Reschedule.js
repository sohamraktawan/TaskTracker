import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory, useLocation } from 'react-router'
import {RiPenNibLine} from "react-icons/ri"
import {MdDoneAll} from "react-icons/md"
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";


function Reschedule() {
    let history = useHistory();
    let location = useLocation();
    const [user, setUser] = useState({})
    const [value, setValue] = useState('10:00');
    const [prior, setprior] = useState("high")
    const [startDate, setStartDate] = useState();
    const [input, setInput] = useState({
        title:location.state.title,
        desc:location.state.desc
    })

    function handleChange(event){
        const{name,value} = event.target;
        setInput((prevInput)=>{
            return{
                ...prevInput,
                [name]:value
            }
        })
    }
    
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
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
  var aDay = 24*60*60*1000;

    function handleClick(e){
        e.preventDefault();
        let time1 = value.split(":")
        let timestamp_hours = time1[0]*3600*1000
    
        let timestamp_minutes = time1[1]*60*1000
    
        let final_time = startDate+timestamp_hours+timestamp_minutes


        console.log(new Date(final_time))


        const newPost ={
            username:user.username,
            title: location.state.title,
            desc: location.state.desc,
            timeDue:final_time,
            priority:prior

        }
        console.log(newPost) 
        axios.post('https://task-tracker-backend-production.up.railway.app/create', newPost)
        .then(res=>{
            console.log(res);
            history.push("/home")
        })
        .catch(err=>{
            console.log(err);
        });

    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://task-tracker-backend-production.up.railway.app/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    setUser(res.data);
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    },[])

    const handleChange1 = (event) =>{
        setprior(event.target.value)
    }


    return (

        <div className="tasks">

            <form action="">
                <div className='make_task_input_container'> 
                <div className="make_task_title_container">Title : {location.state.title}</div>
                <div className="make_task_desc_container">Desc : {location.state.desc}</div>
                <div className="make_task_time_container">
            {" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                let date_timestamp = Date.parse(date);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let miliseconds = date.getMilliseconds();
                let time = date.getTime();
                let date_Date =
                  time -
                  hours * 3600 * 1000 -
                  minutes * 60 * 1000 -
                  seconds * 1000 -
                  miliseconds;
                console.log(date_Date);
                console.log(new Date(date_Date));
                setStartDate(date_Date);
              }}
            />
            <TimePicker
              onChange={(time) => {
                setValue(time);
              }}
              value={value}
            />
          </div>

          <div className="make_task_select_container">
            <select className="make_task_select" value={prior} onChange={handleChange1}>
              <option className="option_high" value="high">High</option>
              <option className="option_moderate" value="moderate">Moderate</option>
              <option className="option_low" value="low">Low</option>
            </select>
          </div>
          <div className="make_task_button_container">
            <button onClick={handleClick} className="make_task_button">
              <MdDoneAll className="publish_icon" /> CREATE
            </button>
          </div>
        </div>
      </form>
        </div>
    )
}

export default Reschedule
