import './ViewRepo.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import profile from '../../assets/profile.jpg';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import ViewUipload from './ViewUipload';

export default function ViewRepo() {
  const location = useLocation();
  const { repoid } = useParams();
  const navigate = useNavigate();
  const popupRef = useRef(null);

  const [isStarred, setIsStarred] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [codeFile, setCodeFile] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDiscription, setIssueDiscription] = useState('');
  const [repoOwner, setRepoOwner] = useState('');

  const tabs = ['code', 'issues'];
  const isOwner = repoOwner === localStorage.getItem('userID');

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch repo data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res = await axios.get(`https://github-clone-s7w9.onrender.com/upload/${repoid}`);
        setRepoOwner(res.data.RepoOwner);
        if (res.data.success) setCodeFile(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [repoid]);

  // Create issue
  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post('https://github-clone-s7w9.onrender.com/issue/create', {
        title: issueTitle,
        discription: issueDiscription,
        Repository: repoid,
        owner: localStorage.getItem("userID")
      });
      alert(res.data.message);
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  // File handling
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('repoid', repoid);

    try {
      setUploading(true);
      let res = await axios.post('https://github-clone-s7w9.onrender.com/upload', formData);
      if (res.status) {
        alert('Upload successful');
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Toggle star
  const toggleStar = () => setIsStarred(!isStarred);

  // Tab navigation
  const renderTabs = () => (
    <nav className='view-nav-1'>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => {
            if (tab === "issues") {
              navigate(`/issue/${repoid}`);
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
  );

  // Top navbar section
  const renderTopNav = () => (
    <nav className='view-nav-2'>
      <div className='navflex'>
        <div className='view-profile'>
          <img src={profile} alt='' />
        </div>
        <div className='view-username'>{location.state.reponame}</div>
      </div>

      <div className='navflex-2'>
        <div className='nav-2-rignt-1'>
          <i className='fa-solid fa-eye'></i> Unwatch
        </div>
        <div className='nav-2-rignt-2'>
          <i className='fa-solid fa-code-pull-request'></i> fork
        </div>
        <div
          onClick={toggleStar}
          className={`nav-2-rignt-3 ${isStarred ? 'starred' : ''}`}
        >
          <i className='fa-regular fa-star'></i> star
        </div>
      </div>
    </nav>
  );

  // File action buttons
  const renderFileActions = () => (
    <div className='view-code-nav-right'>
      {isOwner ? (
        <div onClick={() => setUploading(true)} className="view-code-addFile">
          add file
        </div>
      ) : (
        <div style={{ visibility: 'hidden' }} className="view-code-addFile">
          add file
        </div>
      )}
      <div onClick={() => setShowPopup(!showPopup)} className='view-code-addFile'>
        create issue
      </div>

      {showPopup && (
        <div className="mini-popup" ref={popupRef}>
          <h4 style={{ marginBottom: '10px' }}>New Issue</h4>
          <input
            onChange={(e) => setIssueTitle(e.target.value)}
            value={issueTitle}
            type="text"
            placeholder="Issue Title"
          />
          <textarea
            onChange={(e) => setIssueDiscription(e.target.value)}
            value={issueDiscription}
            placeholder="Issue Description"
          />
          <button onClick={handleIssueSubmit} style={{ marginTop: '10px' }}>
            Create
          </button>
        </div>
      )}
    </div>
  );

  // UI states
  if (loading) {
    return (
      <>
        <Navbar />
        <div>loading...</div>
      </>
    );
  }

  if (uploading) {
    return (
      <>
        <Navbar />
        <ViewUipload repoid={repoid} reponame={location.state.reponame} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='view-container'>
        {renderTabs()}
        {renderTopNav()}
        <hr />

        <div className='view-code-maincontainer'>
          <div className='view-code-nav'>
            <div className='view-code-nav-left'>
              <div>
                <div>
                  <i className='fa-solid fa-code-branch'></i>
                  <p>main</p>
                </div>
              </div>
            </div>

            {renderFileActions()}
          </div>

          <div className='code-container'>
            {codeFile.map((itm) => (
              <div key={itm._id} className='code-file'>
                <i className='fa-solid fa-file'></i>
                <a
                  href={itm.fileurl}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  {itm.filename}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
