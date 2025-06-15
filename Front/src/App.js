import './App.css';
import Header from './components/Header';
import Section from './components/Section';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Member from './pages/Member';
import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';

function App() {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/member" element={<Member />} />
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/" element={
        <div className="App">
          <Header />
          <Section />
        </div>
      } />
    </Routes>
  )
}

export default App;
