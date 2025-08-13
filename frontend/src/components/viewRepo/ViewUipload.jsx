import { useEffect, useState } from 'react';
import './ViewRepo.css';
import profile from '../../assets/profile.jpg';
import axios from 'axios'
import Navbar from '../navbar/Navbar';

export default function ViewUipload ({repoid,reponame}){
    
  const [activeTab, setActiveTab] = useState('code');
  const [loading , setLoading] = useState(false)
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [codeFile , setCodeFile] =useState([])

    const tabs = ['code'];

useEffect(() => {
  async function fetchRepoData() {
    try {
      setLoading(true);
      let res = await axios.get(`http://localhost:8080/upload/${repoid}`);
      if (res.data.success) {
        setCodeFile(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  fetchRepoData();
}, [repoid]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }
    const formData = new FormData();
    formData.append('file', file );
    formData.append('repoid',repoid); 
 
    setUploading(true);
    try {
      const res = await axios.post('http://localhost:8080/upload', formData);
      if(res.status){
        alert('upload successful')
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
    setUploading(false);
  };

if(loading){
    return(
      <>
        <div> loading... </div>
      </>
    )
  }

    return(
       <div className='view-container'>
             <nav className='view-nav-1'>
            {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`tab-button ${activeTab === tab ? 'active' : ''}`}
        >
          {tab}
        </button>
      ))}
      </nav>
      <nav className='view-nav-2'>
        <div className='navflex'>
            <div className='view-profile'> <img src={profile} alt="" /></div>
            <div className='view-username'>{reponame}</div>
        </div>


    <div className='navflex-2'>
      <div className='nav-2-rignt-1'><i className="fa-solid fa-eye"></i> Unwatch</div>
      <div  className='nav-2-rignt-2'><i className="fa-solid fa-code-pull-request"></i> fork</div>
      <div  className='nav-2-rignt-3'><i className="fa-regular fa-star"></i> star</div>
    </div>
    </nav>
    <hr />


<div className='view-body'>

<div className='view-body-left'>

  <p className='view-logo'><i className="fa-brands fa-github-alt"></i></p>
  <p className='view-heading'>Start coding with Codespaces</p>
  <p className='view-description'>add a README File and start coding in a secure confirgurble and dedi cated development enviromant.</p>
  <div>Create a codespace</div>

</div>

<div className='view-body-right'>

<p className='view-logo'><i className="fa-solid fa-user-plus"></i></p>

<p className='view-heading'>Add collaborators to this repository</p>
<p className='view-description'>Search for people using their GitHub username or email address.</p>
<div>invite collaborators</div>

</div>

</div>


<div className='view-main-body'>

  <div className='view-top'>
    <p className='view-top-heading'>Quick setup -- fi you've dont think kind of thing before</p>
    <div className='view-main-https'>
 <p> <i className="fa-solid fa-desktop"></i>setup up in desktop</p> 
 <div>or</div>
 <p>HTTPS</p>
    </div>
<div className='view-main-url'>github.com/Username/repo.git</div>
  </div>
  <div className='view-form-containe'>
<p>Get stared by creating a new file of  uploding existing file We recommend every repository include a READMI, LICENSE, and .gitigore</p>

 <div className="p-4 border rounded w-full max-w-md mx-auto mt-6 bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Upload File</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {fileUrl && (
        <div className="mt-4">
          <p className="text-green-600">File uploaded successfully!</p>
          <a href={fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            View File
          </a>
        </div>
      )}
    </div>
  </div>
  <hr style={{marginBottom:"0"}} />
<div className='view-body-bottum'>

<p className='view-body-bottum-heading' style={{marginTop:'0'}}>...or create a new repository on the command line</p>
<div className='view-body-code'>
  <p>echo "# repo" README.md</p>
  <p> node app.js init</p>
  <p>node app.js add README.md</p>
  <p>node app.js commit -m " first commit"</p>
  <p>node app.js branch -M main</p>
  <p>node app.js remote add origin git@github.com:{localStorage.getItem('username')}/repo.git</p>
  <p>node app.js Push -u origin main</p>
</div>
<p className='view-body-bottum-heading'>... of push an existing repository from the command line</p>
<div className='view-body-code'>
  <p>node app.js remote add origin git@github.com:{localStorage.getItem('username')}/repo.git</p>
  <p>node app.js branch -M main</p>
  <p>node app.js Push -u origin main</p>
</div>
</div>
</div>
    </div>
    )
}