import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import Login from './Login';
import Header from './Header';
import { Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from "./Dashboard";
import Search from "./Search";
import Activity from "./Activity.js";
import TopicForm from "./TopicForm";
import Saved from "./Saved";

function App() {

  const [user, setUser] = useState(null)
  

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  },[])
  if (!user) return <Login onLogin={setUser} />;

  useEffect(() => {
    fetch("/forums")
      .then((r) => r.json())
      .then(setForums);
  }, []);

  return (
    <div className='App'>
      <Header setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/activity' element={<Activity/>}/>
        <Route path='/topicForm' element={<TopicForm/>}/>
        <Route path="/saved" element={<Saved/>}/>
      </Routes>
    </div>
  );

}

export default App;
