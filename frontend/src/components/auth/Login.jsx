import './Signup.css';
import axios from 'axios';
import logo from '../../assets/github-mark-white.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useAuth} from '../../AuthContext';

export default function Login (){

const navigate = useNavigate();

let [username , setUsername] = useState('');
let [password , setPassword] = useState('');
let [loading , setLoading] = useState(false)

let {setCurrentUser} = useAuth();

let handleSubmit = async (e)=>{

     e.preventDefault();

if(!username ||!password){
alert("all feld is required")
}
try{
  setLoading(true)
    let responce = await axios.post("https://github-clone-s7w9.onrender.com/user/login",{
        username,
        password
    })

    if(responce.data.success){
   
        localStorage.setItem("userID",responce.data.userID)
        localStorage.setItem("token",responce.data.token)

         setCurrentUser(responce.data.userID)
          navigate("/")
        setLoading(false)
    }
    else{
        alert(responce.data.message)
        setLoading(false)
    }

}
catch(e){
    console.log(e)
}
}
    return(
        <div className="SignupContainer">

    <div className='githublogo'>
        <img src={logo} alt="" />
    </div>

    <div className='hedding'> Sign Up</div>

    <div className='signupformcontainer'>
        <form onSubmit={handleSubmit} action="">

            <label htmlFor="username">username</label>
            <br />
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} id='username' placeholder='username'/>
<br />
            <label htmlFor="password">password</label>
            <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id='password'/>
<br />
            <button disabled={loading}>  {loading ? "loading..." : "login"}  </button>
        </form>
        <div className='loginNavigateContainer'>
    <p> <Link className="text-decoration" to={"/auth"}> create account </Link></p>
</div>
    </div>

        </div>
    )
} 