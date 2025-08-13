import { useEffect,useRef,useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './UserIssue.css'
import axios from 'axios';


export default function UserIssue (){
    let [allUserIssuse , setAllUserIssuse] = useState([]);
    let [showPopup , setShowPopup] = useState(false);
    let [ issueTitle , setIssueTitle] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    let [ issueDiscription , setIssueDiscription] = useState('');
    let [currentIssueId , setCurrentIssueId] = useState('');
    let repoid = localStorage.getItem('userID');
    let [loading , setLoading] = useState(false)
      const popupRef = useRef(null);
      const location = useLocation();
let updatePayload = {};

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


  const handleChange = (e) => {
    setIsChecked(e.target.checked); 
  };

    useEffect(()=>{
        async function fetchUserIssuse() {
        try{
             setLoading(true)
            let responsc = await axios.get(`https://github-clone-s7w9.onrender.com/issue/user/${repoid}`) 
            if(responsc.data.data.length >= 1){
              setAllUserIssuse(responsc.data.data)
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
        fetchUserIssuse()
    },[])

let handleDelete = async ()=>{

  let reponame = allUserIssuse.filter(repo => repo._id === currentIssueId);
 
if( !reponame[0].title){
  return alert("no repo found")
}
  let userResponse = prompt(`pleese enter reponame "${reponame[0].title} " for delete`)
  if(userResponse !== reponame[0].title){
   return alert('Repo Name Not Match')
  }
let responsc = await axios.get(`https://github-clone-s7w9.onrender.com/issue/delete/${currentIssueId}`)
if( ! responsc.data.success){
alert(responsc.data.message)
}

alert(responsc.data.message)

setShowPopup(false)
window.location.reload();

}
let handleIssuSubmit = async(e)=>{
 e.preventDefault();

if(issueTitle.trim()!==""){
updatePayload.title = issueTitle;
}

if(issueDiscription.trim() !==""){
  updatePayload.discription = issueDiscription
}

updatePayload.status = isChecked ? "closed": "open";

 let responsc = await axios.post(`https://github-clone-s7w9.onrender.com/issue/update/${currentIssueId}`,updatePayload)
alert(responsc.data.message)
setIssueDiscription('')
setIssueTitle('')
setShowPopup(false)
}
if(loading){
  return(
    <>
    <Navbar/>
    <div style={{fontSize:"2rem",padding:"3rem 0 0 10rem"}}>Loading....</div>
    </>
  )
}
 return(
    <>
    <Navbar/>
     <div className="issue-Main-Container">

<div className="issue-Contaner">

<div className="issue-Contaner-Navbar"> {allUserIssuse.length} results </div>
<div className="user-issue-Navigate-row">
    <p className="User-issue-title">title</p>
    <p>description</p>
    <div>
    <p className='User-issue-Status'>status</p>
    <p className="User-issue-status">edit</p>
    </div>
</div>

{allUserIssuse.length >= 1 ?<>
    
    {allUserIssuse.map((itm ,id )=>{
        return(
<div key={itm._id}>
<div className="User-show-Issue-Contaner">
<p className="User-issue-title-data"> {itm.title} </p>
<p> {itm.discription}</p>
<div>
<p className='User-issue-Status-data'>{itm.status}</p>
<p  className="User-issue-status-data" > <i onClick={() => {
  setShowPopup(!showPopup),
  setCurrentIssueId(itm._id)
}
  } className="fa-solid fa-ellipsis-vertical"></i> </p>
  </div>
</div>
<hr />
     </div>
        )
    })}

{showPopup && (
  <div className="mini-popup" ref={popupRef}>
    <h4 style={{ marginBottom: '10px' }}>Update Issue</h4>
    <input onChange={(e)=>{setIssueTitle(e.target.value)}} value={issueTitle} type="text" placeholder="Issue Title" />
    <textarea onChange={(e)=>{setIssueDiscription(e.target.value)}} value={issueDiscription} placeholder="Issue Description" />
         <div onClick={handleDelete} className='popup-delete'>Delete issue</div>
      <div>issue status</div>
  <input
   type="checkbox"
    className="custom-switch"
    checked={isChecked}
     onChange={handleChange}
    /> 
  <br />
    <button onClick={handleIssuSubmit} style={{ marginTop: '10px' }}> Update </button>
  </div>
)}

</>
:<div className="issue-noDataFound" > no data found</div>
}

</div>
     </div>
    </>
    )
}