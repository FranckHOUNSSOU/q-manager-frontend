import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home/Home'
import AgentInterface from './interfaces/agentInterface/agentInterface'
import Dashboard from './interfaces/agentInterface/pages/Dashboard/Dashboard'
import Processing from './interfaces/agentInterface/pages/Processing/Processing'
import Statistics from './interfaces/agentInterface/pages/Statistics/Statistics'
import Profil from './interfaces/agentInterface/pages/Profil/Profil'
import Staff from './interfaces/agentInterface/pages/Staff/Staff'
import AddAgent from './interfaces/agentInterface/pages/Staff/AddAgent/AddAgent'
import PlayerInterface from './interfaces/playerInterface/playerInterface'
import TicketInterface from './interfaces/ticketInterface/ticketInterface'
import Login from './Authentication/login/login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agentInterface" element={
          <ProtectedRoute>
            <AgentInterface />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="processing" element={<Processing />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profil" element={<Profil />} />
          <Route path="staff" element={<Staff />} />
          <Route path="addAgent" element={<AddAgent />} />
        </Route>
        <Route path="/playerInterface" element={<PlayerInterface />} />
        <Route path="/ticketInterface" element={<TicketInterface />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
