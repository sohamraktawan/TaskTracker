import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'

import {RiPenNibLine} from "react-icons/ri"

const mystyle={
    height:'500px',

}

function SignUp() {
    
    let history = useHistory();

    const [input, setInput] = useState({
        username:'',
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

    const [usernameError, setusernameError] = useState("")
    const [emailError, setemailError] = useState("")
    const [passwordError, setpasswordError] = useState("")



    function handleClick(e){
        e.preventDefault();

        setusernameError("")
        setemailError("")
        setpasswordError("")

        const newUser ={
            username: input.username,
            email: input.email,
            password: input.password
        }
        console.log(newUser)
        //axios.defaults.withCredentials = true;
        axios.post('https://task-tracker-backend-production.up.railway.app/signup', newUser )

            .then(async (res)=>{
            
            const data = await res.data;

            
            console.log('resdata', data);

            
            if(data.errors){
                setusernameError(data.errors.username)
                setemailError(data.errors.email)
                setpasswordError(data.errors.password)

            }else{

                history.push('/login');
            }
            })
            .catch((err)=>{ 
                console.log("only this works");        
                console.log(err);
  
            }).finally((res)=>{
                console.log(res)
            })

    }
    return (




        <div className="login" >
            <h2 className='login_head'>Task Tracker App</h2>
            <h2 className='login_head'>Sign Up</h2>
            <form action="">

                <div className="login_input_container"><input onChange={handleChange} type="text" name="username" id="username" className="login_input"  value={input.username} autoComplete="off" placeholder="username"/></div>
                <div className="signuperror">{usernameError}</div>
                <div className="login_input_container"><input onChange={handleChange} type="email" name="email" id="email" className="login_input"  value={input.email} autoComplete="off" placeholder="email"/></div>
                <div className="signuperror">{emailError}</div>
                <div className="login_input_container"><input onChange={handleChange} type="password" name="password" id="password" className="login_input"  value={input.password} autoComplete="off" placeholder="password"/></div>
                <div className="signuperror">{passwordError}</div>
                <div className="login_button_container"><button className='login_button' onClick={handleClick}>Sign Up</button></div>
            </form>
            <div className="login_notuser">Already registered?</div>
            <Link className="login_signup_out" to="/login"><h4 className="login_signup">Click here to login</h4></Link>

        </div>

    )
}

export default SignUp