import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useEffect, useRef ,useState } from 'react';
import axios from "axios";
import "./Issue.css"
export default function Issue(){

    const [activeTab, setActiveTab] = useState('issues');
    const [reponame , setReponame] = useState('')
    const [allIssue , setAllIssue] = useState([])
      const { repoid } = useParams();
       let navigate = useNavigate()

       
     const tabs = ['code', 'issues'];

     useEffect(()=>{
        async function repositoryData() {
          try{
            let responce = await axios.get(`http://localhost:8080/repositories/${repoid}`)
            setReponame(responce.data.data.name)
        }
        catch(e){
    console.log(e)
}
        }

     async function issueData() {
      try{
        let responce = await axios.get(`http://localhost:8080/issue/${repoid}`)
     setAllIssue(responce.data.data)
     }
     catch(e){
    console.log(e)
}
}



        repositoryData();
        issueData()
     },[])
    return(
    <>
    <Navbar/>
     <div className="issue-Main-Container">
 <nav className='view-nav-1'>
            {tabs.map((tab) => (
  <button
    key={tab}
    onClick={() => {
      if (tab === "code") {
      navigate(`/repository/${repoid}`,{state:{reponame:reponame}})
      } else {
        setActiveTab(tab);
      }
    }}
    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
  >
    {tab}
  </button>
))}
</nav>

<div className="issue-Contaner">

<div className="issue-Contaner-Navbar"> {allIssue.length} results </div>
<div className="issue-Navigate-row">
    <p className="issue-title">title</p>
    <p>description</p>
    <p className="issue-status">status</p>
</div>

{
    allIssue.length >= 1 ? <> 
    
    {allIssue.map((itm ,idx)=>{
        return(
            <div key={itm._id}>
            <div className="show-Issue-Contaner">
<div> {itm.title}</div>
<div> {itm.discription}</div>
<div>{itm.status}</div>
</div>
<hr />
</div>
        )
    })}
    
      </>
     :<div className="issue-noDataFound"> no data found</div>
}
</div>
     </div>
    </>
    )
}