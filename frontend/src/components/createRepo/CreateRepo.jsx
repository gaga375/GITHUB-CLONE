import React, { useState } from 'react';
import './CreateRepo.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar'

export default function CreateRepo () {

let location = useLocation();
let username = location.state
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState(true);
  const [addReadme, setAddReadme] = useState(false);
  let navigation = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{

    let owner = localStorage.getItem("userID");
  let responce = await axios.post("https://github-clone-s7w9.onrender.com/create",{
    owner,
    name:repoName,
    descrption:description,
    visibility,
  })
 alert(responce.data.message)
navigation('/')
}
catch(e){
    console.log(e)
}
  };

  return (
<>
    <Navbar/>

    <div className="form-container">
      <h1>Create a new repository</h1>
      <p className="subtitle">
        A repository contains all project files, including the revision history.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Owner</label>
          <div className="owner-box">
            <div className="owner">{username}</div>
            <span className="slash">/</span>
            <input
              type="text"
              style={{height:"1.7rem"}}
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="Repository name"
              required
            />
          </div>
        </div>

        <p className="hint">
          Great repository names are short and memorable. Need inspiration? <span className="green">friendly-tribble</span>
        </p>

        <div className="form-group">
          <label>Description (optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div className="form-group">
          <label>Visibility</label>
          <div className="radio-option">
            <input
              type="radio"
              value="public"
              checked={visibility === true}
              onChange={() => setVisibility(true)}
            />
            <div>
              <strong>Public</strong>
              <p>Anyone on the internet can see this repository. You choose who can commit.</p>
            </div>
          </div>

          <div className="radio-option">
            <input
              type="radio"
              value="private"
              checked={visibility === false}
              onChange={() => setVisibility(false)}
            />
            <div>
              <strong>Private</strong>
              <p>You choose who can see and commit to this repository.</p>
            </div>
          </div>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={addReadme}
              onChange={(e) => setAddReadme(e.target.checked)}
            />
            Add a README file
          </label>
          <p>This is where you can write a long description for your project.</p>
        </div>

        <p className="final-note">You are creating a {visibility} repository in your personal account.</p>

        <button type="submit" className="create-btn">Create repository</button>
      </form>
    </div>
    </>
  );
};
