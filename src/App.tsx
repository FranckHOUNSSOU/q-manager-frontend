//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AgentInterface from './interfaces/agentInterface/agentInterface'
import Login from './Authentication/login'
import SignUp from './Authentication/SignUp'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/agentInterface" element={<AgentInterface />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
