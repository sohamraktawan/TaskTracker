import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';
import {BsPencilSquare} from 'react-icons/bs'
import {HiHome} from 'react-icons/hi'
import {HiDuplicate} from 'react-icons/hi'
import {HiFire} from 'react-icons/hi'
import {FiLogOut} from 'react-icons/fi'
import {RiPenNibLine} from "react-icons/ri"
import {TiThMenu} from "react-icons/ti"

function Right() {
    let history = useHistory();
    const [user, setUser] = useState({})
    const completed = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://task-tracker9.herokuapp.com/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/complete")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }

    const authToken = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://task-tracker9.herokuapp.com/auth', {token:token})
            .then(res=>{
                console.log(res.data)
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    setUser(res.data);
                    console.log(user);
                    history.push("/home")

                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    }

    const authToken1 = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://task-tracker9.herokuapp.com/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/create")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }
    
    const authToken2 = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://task-tracker9.herokuapp.com/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/dropdown")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        history.push('/login');
    }

    

    const Trending = () =>{
        let token = localStorage.getItem('token');
        if(token){
            axios.post('https://task-tracker9.herokuapp.com/auth', {token:token})
            .then(res=>{
                if(res.data === false){
                    
                    history.push("/login");
                }else{
                    console.log(res.data)
                    setUser(res.data);
                    console.log(user);
                    history.push("/trending")
                }
            })
            .catch((err) =>{
                console.log(err);
            })
        }else{
            history.push("/login");
        }
    }
    return (
        <div className="right">
                
        <button className="header_mid_item"  onClick={authToken} type="button" name="home"><HiHome  className="makepost_icon"/>Home</button>
           <button className="header_mid_item" onClick={authToken1} type="button" name="create"> <BsPencilSquare className="makepost_icon"/>Create a Task</button>

           <button className="header_mid_item"  onClick={completed} type='button' name='yourposts'><HiDuplicate className="makepost_icon"/>Completed Tasks</button>

       <div className="header_right">
       <   button onClick={logOut} className="header_right_item" type="button" name="logout"> <FiLogOut className="makepost_icon"/>Log Out</button>
        </div>
        </div>
    )
}

export default Right
