import './Profile.css'
import profile from '../../assets/profile.jpg';
import axios from 'axios';
import { useEffect,useRef, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';


export default function  Profile(){
let [data , setData] = useState([]);
let [username , setUsername] = useState("");
let [ currentRepoid , setCurrentRepoId] = useState('')
let [repoDescrption , setRepoDescrption] = useState('');
let [content , setContent] = useState('');
let [visibility , setVisibility] = useState(false);
let [showPopup , setShowPopup] = useState(false);
let [loading , setLoading] = useState(false);
const popupRef = useRef(null);
let updatePayload = {};
 const location = useLocation();

useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);


useEffect(()=>{
    async function FetchData() {
       let id = localStorage.getItem('userID')
 try{
    setLoading(true)
        let responce = await axios.get(`https://github-clone-s7w9.onrender.com/userrepo/${id}`)
        if(! responce.data.success){
        alert('something went wrong')
        }
          if( responce.data.data.length >= 1){
         setData(responce.data.data)
      setUsername(responce.data.data[0].owner.username)
       setLoading(false)
         }
         else{
          setLoading(false)
         }
 }
 catch(e){
    console.log(e)
     setLoading(false)
 }
    }
    FetchData()
},[])

  const handleChange = (e) => {
    setVisibility(e.target.checked); 
  };

async function handleSubmit(e) {

 e.preventDefault();

 if(repoDescrption.trim()!==""){
updatePayload.repoDescrption = repoDescrption;
}

if(content.trim()!==""){
    updatePayload.content = content;
}
updatePayload.visibility = visibility

try{
    let responce = await axios.post(`https://github-clone-s7w9.onrender.com/repositori/update/${currentRepoid}`,updatePayload)
    alert(responce.data.message)
    }
catch(e){
    console.log(e)
}
}

async function handleDelete() {
  try{
let reponame = data.filter(repo => repo._id === currentRepoid);

  if( !reponame[0].name){
  return alert("no Repository found")
}
let userResponse = prompt(`pleese enter Repository "${reponame[0].name} " for delete`)

 if(userResponse !== reponame[0].name){
   return alert('Repo Name Not Match')
  }
let responce = await axios.get(`https://github-clone-s7w9.onrender.com/repositories/delete/${currentRepoid}`)
if(responce.data.success){
  alert('Repository delete successfully')
}
else{
  alert(responce.data.message)
}
setShowPopup(false)
window.location.reload();
}
catch(e){
    console.log(e)
}
}

if(loading){
    return(

        <>loading...</>
    )
}

    return(
    <>
    <Navbar/>
    <div className="profile-maincontaner">

        <div className='profile-container'>
            
        <div className='Profile-left'>

<div className='profile-img'>
    <img src={profile} alt="" />
</div>
<p>{username}</p>

        </div>
<div className='extra'></div>
        <div className='profile-right'>

            <p>Populer repositories</p>

        <div className='right-grid'>
          {data.length === 0 ? <> no repositori found</>: <>
            {
                data.map((itm,idx)=>{
                    return(
<div className='Profile-show-box' key={itm._id}>
  
   <div className='Profile-show-box-name'> {itm.name} </div>
   <div className='Profile-show-box-rightConponent'>
   <span>{itm.visibility?<>public</>:<>private</>} </span> 

 <i  onClick={() => {
  setShowPopup(!showPopup),
  setCurrentRepoId(itm._id)
}} className=" Profile-threedot fa-solid fa-ellipsis-vertical"></i>
</div>

</div>             
                    )
                })
            }</>
          }
        </div>
        </div>
         </div>
       {showPopup && (
  <div className="mini-popup" ref={popupRef}>
    <h4 style={{ marginBottom: '10px' }}>Update Repository</h4>
    <input onChange={(e)=>{setRepoDescrption(e.target.value)}} value={repoDescrption} type="text" placeholder=" Repository Content" />
    <textarea onChange={(e)=>{setContent(e.target.value)}} value={content} placeholder="Repository Description" />
         <div onClick={handleDelete} className='popup-delete'>Delete Repository</div>
      <div>Repository visibility</div>
  <input
   type="checkbox"
    checked={visibility}
     onChange={handleChange}
    className="custom-switch"
    /> 
  <br />
    <button  onClick={handleSubmit} style={{ marginTop: '10px' }}> Update Repository</button>
  </div>
)}
         
    </div>
    
    </>
    )
}