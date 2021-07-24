import React,{useState} from 'react'
import axios from 'axios'
import {Redirect, useHistory, Link} from 'react-router-dom'
import {RiPenNibLine} from "react-icons/ri"


const mystyle={
    color:"white"
}

function Login() {
    let history = useHistory();
    const [usernameError, setusernameError] = useState("")
    const [emailError, setemailError] = useState("")
    const [passwordError, setpasswordError] = useState("")
    const [user, setUser] = useState({})
    const [input, setInput] = useState({
        email:'',
        password:''
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



    function handleClick(e){
        e.preventDefault();


        const newUser ={

            email: input.email,
            password: input.password
        }
        console.log(newUser)
    
        axios.post('https://task-tracker9.herokuapp.com/login', newUser)

            .then(async (res)=>{
            
            const data = await res.data;

            if(data.errors){
                setusernameError(data.errors.username)
                setemailError(data.errors.email)
                setpasswordError(data.errors.password)

            }else{
                console.log("data", data)
                localStorage.setItem("token", data)
                history.push("/home")
            }
            
            })
            .catch((err)=>{ 
                console.log("only this works");        
                console.log(err);
  
            })

    }
    return (

           


            <div className="login">
            <h2 className="login_head">Task Tracker App</h2>
            <h2 className="login_head">Log in</h2>
            <form action="">
                <div className="login_input_container"><input onChange={handleChange} type="email" name="email" id="email" className="login_input" value={input.email} autoComplete="off" placeholder="email"/></div>
                <div className="signuperror">{emailError}</div>
                 
                <div className="login_input_container"><input onChange={handleChange} type="password" name="password" id="password" className="login_input" value={input.password} autoComplete="off"placeholder="password"/></div>
                <div className="signuperror">{passwordError}</div>
                <div className="login_button_container"><button className="login_button" onClick={handleClick}>Login</button></div>
            </form>

            <h2 className="login_notuser">Not an user?</h2>
            <Link className="login_signup_out" to="/"><h4 className="login_signup">Sign Up here</h4></Link>
            
            </div>
            


        
        
    )
}

export default Login
