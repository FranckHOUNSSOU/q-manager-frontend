import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import "./agentInterface.css";

function AgentInterface() {
  return (
    <div className="agent-interface">
      <SideBar />
      <main className="agent-main">
        <NavBar />
        <div className="agent-content">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default AgentInterface;
