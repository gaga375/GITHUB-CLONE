import "./Dashboard.css";
import axios from 'axios';
import profile from '../../assets/profile.jpg';
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link } from 'react-router-dom';

export default function Dashboard (){
    let [navQuearyFalse , setNavQuearyFalse] = useState(false);
    let [allrepo , setAllrepo] = useState([]);
    let [allRepoForUser , setAllRepoForUser] = useState([]);
    let [loading , setLoading] = useState(false);
    let [loading_2 , setLoading_2] = useState(false);
    let[leftSearchQueary , setLeftSearchQueary] = useState("");

function handleNavQueary (queary){

    if(queary === false){
     setNavQuearyFalse(true)

    }
    if(queary.length >= 1){
setAllRepoForUser(queary)
    }
}

useEffect(()=>{
    async function userRepo() {
        setLoading(true)
        try{

        let id = localStorage.getItem('userID')
        let responce = await axios.get(`https://github-clone-s7w9.onrender.com/userrepo/${id}`)
        setAllRepoForUser(responce.data.data)
        setLoading(false)

        }
        catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    userRepo()
},[])

    useEffect(()=>{
async function alldatafetch (){
    setLoading_2(true)
try{
let responce = await axios.get("https://github-clone-s7w9.onrender.com/allrepofetch")
 setAllrepo(responce.data.data)
 setLoading_2(false)
}catch(e){
    console.log(e)
     setLoading_2(false)
}
}
alldatafetch()
    },[])

let handleLeftSubmit = (e)=>{
   e.preventDefault();
let search = leftSearchQueary.trim().toLowerCase()
let result = allrepo.filter((repo)=> repo.name == search);

if(result.length){
    setAllrepo(result)
}
}
    return(
        <>
        <Navbar onSearch = {handleNavQueary} />
       <div className="container-body">

<div className="left-container">

    <div className="left-flex">
    <div className="user-photo"><img src={profile} alt="" /></div>
  <div className="username">{localStorage.getItem('username')}</div>
     </div>
 <div className="heading">recommended</div>
 <div className="left-form">
 <form onSubmit={handleLeftSubmit} action="">
    <input value={leftSearchQueary} onChange={(e) => setLeftSearchQueary(e.target.value)} type="text" placeholder="Search Github"/>
 </form>
 </div>
<div className="recent-repo">
{loading ? <>Loading...</> : <></>}
        {allrepo.map((itm,index)=>{
            return(    
            <div key={itm._id}>
                  <Link to={`/repository/${itm._id}`} state={{reponame:itm.name}} style={{textDecoration:"none",color:"white",opacity:"0.8"}}>
          <div className="recent-profile-flex">
            <div className="recent-userprofile"><img src={profile} alt="" /></div>
        <div className="recent-username">{itm.name}</div>
         </div>
  <hr />
   </Link>
            </div>
           
            )
        })}
       
</div>
</div>
<div className="midle-container">

<div className="m-heding"> Your repository & search </div>
{navQuearyFalse ? <div> no data found </div>: <>
{loading_2 ? <>Loading...</> : <></>}
{allRepoForUser.map((itm , index)=>{
    return(
        <div key={itm._id}>
<div className="card">
    <h2> {itm.name}</h2> 
    <p> {itm.descrption}</p>
  <Link to={`/repository/${itm._id}`} state={{reponame:itm.name}} style={{textDecoration:"none",color:"blue",opacity:"0.8"}}> <p className="m-link">VIEW REPOSITORY</p> </Link> 
</div>
      </div>
    )
})}
</>}

</div>
<div className="right-container">
<div className="rignt-heding">NO New Update</div>
 <div className="rignt-icon"><i className="fa-solid fa-triangle-exclamation"></i></div>
       </div>
       </div>
       </>
    )
    
}