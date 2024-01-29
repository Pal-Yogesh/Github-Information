import React, { useState } from 'react';
import axios from 'axios';
import "./Home.css";
import { FaGithub } from "react-icons/fa";
const Card = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [isSearchActive, setSearchActive] = useState(false);

  const handleSearch = () => {
    axios.get(`https://api.github.com/users/${name}`)
      .then(response => {
        setUserData(response.data);
        setName(''); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  
  const searchToggle = (event) => {
    event.preventDefault();
    setSearchActive(!isSearchActive);
  };

  const closeSearch = () => {
    setSearchActive(false);
  };

  return (

    <div className="container">
      
      <header className="app-header">
      <div className={`search-wrapper ${isSearchActive ? 'active' : ''}`}  >
      <div className="input-holder">
        <input
          type="text"
          value={name}
          className="search-input"
          placeholder="Type to search"
          onChange={handleInputChange}
        />
       
        <button className="search-icon" onClick={searchToggle} >
          <span></span>
        </button>
      </div>
      <span className="close" onClick={closeSearch}></span>
    </div>
    </header>
    <div className='search-btn'>
        <button className="search-button1" onClick={handleSearch}>Search</button>
        </div>
        
   
      {userData ? (
        <div className='main-card'>
        <div className="card">
          <img src={userData.avatar_url} alt="Profile" />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <a href={userData.blog}>Portfolio {userData.blog}</a>
          <a href={userData.html_url}><FaGithub /> Github Profile</a>
          <p>{userData.location}</p>
        </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Card;
