import "./Navbar.css";
import logo from '../../assets/github-mark-white.svg';
import profile from '../../assets/profile.jpg';
import { useEffect, useRef,useState } from "react";
import axios from "axios";
 import { Link , useLocation } from 'react-router-dom';
 import { href } from "react-router-dom";
 import { useAuth } from "../../AuthContext";



export default function Navbar ( {onSearch}){
    const location = useLocation();
    const {currentUser , setCurrentUser} = useAuth();
let [username , setUsername] = useState("username")
let [searchQueary , setSearchQueary] = useState('')
let id = localStorage.getItem("userID");
let [visibility , setVisibility] = useState(false);
const popupRef = useRef(null);

let handleSubmit = async (e)=>{
   e.preventDefault();

if(! searchQueary.trim()) return;

try{
let responce = await axios.get(`http://localhost:8080/repositoriesname/${searchQueary}`)
if(! responce.data.success) return onSearch(false);
onSearch(responce.data.data)
}catch(e){
    console.log("somthing went wrong")
}

}

async function handleLogout() {
    let userInput = prompt('Type yes to continue logout')
    if(userInput === 'yes'){
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setCurrentUser(null)
    window.location.href = '/login';
    }
    else{
        alert('logout unsuccessfully')
    }
}

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisibility(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

useEffect(()=>{

   async function userCall (){
    try{
let responce =  await axios.get(`http://localhost:8080/userProfile/${id}`);
setUsername(responce.data.user.username)
localStorage.setItem('username',responce.data.user.username)
    }
    catch(e){
    console.log(e)
}
    }
    userCall()
},[])

    return(<>

<div ref={popupRef}  className={visibility ? "sidebar-visibility Navbar-Sidebar-container" : "Navbar-Sidebar-container"}>
<div className="Navbar-top-container">
  <div> <img src={logo} alt="" /></div>
    <div onClick={ ()=>{setVisibility(false)}} ><i className="fa-solid fa-x"></i></div>
</div>
<div className="Navbar-Body-container">
<Link to={"/"} style={{textDecoration:'none',color:'white'}}> <div><i className="fa-solid fa-house"></i> home</div> </Link>
<Link to={"/user/issues"} style={{textDecoration:'none',color:'white'}}> <div><i className="fa-regular fa-circle-dot"></i> issues</div> </Link>
<Link to={"/"} style={{textDecoration:'none',color:'white'}}> <div className="disabled"><i className="fa-solid fa-code-branch"></i> Pull requests</div></Link>
<div className="disabled" ><i className="fa-solid fa-box"></i> Projects </div>
<div className="disabled"><i className="fa-solid fa-comments-dollar"></i> Siscussions</div>
<div className="disabled"> <i className="fa-solid fa-computer"></i> codespaces</div>
<div className="disabled"><i className="fa-solid fa-wand-magic-sparkles"></i> copilet</div>
<div onClick={handleLogout} ><i className="fa-solid fa-arrow-right-from-bracket"></i> logout</div>
</div>
</div>

     <nav className="nav-main-container">

    <div className="nav-left-container">
<div className="flex">
    <div onClick={()=>{setVisibility(true)}} className="active nav-3line"><i className="fa-solid fa-bars"></i></div>
    <Link to={'/'}>
    <div><img src={logo} alt="" /> </div> 
    </Link>
    <div className="nav-username">{username}</div>
</div>
    </div>

    <div className="nav-right-container flex-1">


        <div className="nav-form-container"> 
            <form action="" onSubmit={handleSubmit} >
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" onChange={(e)=>{setSearchQueary(e.target.value)}} style={{paddingTop:'0.2rem'}} value={searchQueary}  placeholder="Search GitHub" />
            </form>
             </div>

        
            <Link style={{textDecoration:"none",color:"white",opacity:"0.8"}} to={'/new'} state={username}><div className="active nav-plusicon"> <i className="fa-solid fa-plus"></i> <p className="tolltip-text">Add Rep... </p> </div></Link>
           <Link style={{textDecoration:"none",color:"white",opacity:"0.8"}} to={'/user/issues'} ><div className="active nav-plusicon"><i className="fa-regular fa-circle-dot"></i><p className="tolltip-text">issue </p></div></Link> 
             <div className="nav-plusicon"> <i style={{paddingTop:'0'}} className="fa-solid fa-code-branch"></i><p className="tolltip-text">Branch </p></div>
             <div className="nav-plusicon"> <i  className="fa-regular fa-envelope"></i><p className="tolltip-text">Message </p></div>
             <Link to={'/profile'}><div className="nav-profile"><img src={profile} alt="" /></div></Link>
    </div>


     </nav>
     </>
    )
}