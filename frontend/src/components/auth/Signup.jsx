import './Signup.css';
import logo from '../../assets/github-mark-white.svg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



export default function Signup (){

const navigate = useNavigate();

let [username , setUsername] = useState('');
let [password , setPassword] = useState('');
let [email , setEmail] = useState('');
let [loading , setLoading] = useState(false)


let handleSubmit = async (e)=>{
  e.preventDefault();

  if(!username ||!password ||! email){
alert("all feld is required")
}

try{
    setLoading(true)

    let responce = await axios.post("https://github-clone-s7w9.onrender.com/user/register",{
        username,
        password,
        email
    })
    if(responce.data.success){
        navigate("/login")
        setLoading(false)
    }
    else{
        setLoading(false)
        alert(responce.data.message)
    }
}
catch (e){
console.log(e)
setLoading(false)
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
            <label htmlFor="signup-email">email</label>
            <br />
            <input type="text" id='signup-email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='gagn@test.com'/>
<br />
            <label htmlFor="password">password</label>
            <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id='password'/>
<br />
            <button disabled={loading}> {loading ? "loading..." : "Sign up"} </button>
        </form>
        <div className='loginNavigateContainer'>
    <p >already have an account ? <Link className="text-decoration" to={"/login"}>login </Link> </p>
</div>
    </div>

        </div>
    )
} 