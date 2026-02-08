//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home/Home'
import AgentInterface from './interfaces/agentInterface/agentInterface'
import PlayerInterface from './interfaces/playerInterface/playerInterface'
import TicketInterface from './interfaces/ticketInterface/ticketInterface'
import Login from './Authentication/login'
import SignUp from './Authentication/SignUp'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/agentInterface" element={<AgentInterface />} />
        <Route path="/playerInterface" element={<PlayerInterface />} />
        <Route path="/ticketInterface" element={<TicketInterface />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
