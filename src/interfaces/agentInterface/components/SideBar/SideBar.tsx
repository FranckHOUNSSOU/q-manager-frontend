import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiLayout,
  FiZap,
  FiBarChart2,
  FiSettings,
  FiChevronLeft,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { clearTokens, getUser } from "../../../../api/auth";
import "./SideBar.css";

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const isAdmin = user?.role === "admin";

  console.log("User data:", user);
  console.log("Is admin:", isAdmin);

  useEffect(() => {
    if (
      location.pathname.includes("/profil") ||
      location.pathname.includes("/staff")
    ) {
      setSettingsOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    clearTokens();
    navigate("/");
  };

  return (
    <aside className={`agent-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src="/insigne.png" alt="Q-MANAGER" className="sidebar-logo" />
        {!collapsed && <span className="sidebar-app-name">Q-MANAGER</span>}
        <button
          type="button"
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          <FiChevronLeft />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/agentInterface/dashboard"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          end
        >
          <FiLayout className="sidebar-icon" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/agentInterface/processing"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <FiZap className="sidebar-icon" />
          {!collapsed && <span>Processing</span>}
        </NavLink>
        <NavLink
          to="/agentInterface/statistics"
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
        >
          <FiBarChart2 className="sidebar-icon" />
          {!collapsed && <span>Statistics</span>}
        </NavLink>

        <div className="sidebar-dropdown">
          <button
            type="button"
            className={`sidebar-link ${settingsOpen ? "open" : ""}`}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <FiSettings className="sidebar-icon" />
            {!collapsed && (
              <>
                <span>Settings</span>
                <FiChevronDown className="sidebar-chevron" />
              </>
            )}
          </button>
          {!collapsed && settingsOpen && (
            <div className="sidebar-submenu">
              <NavLink
                to="/agentInterface/profil"
                className={({ isActive }) =>
                  `sidebar-sublink ${isActive ? "active" : ""}`
                }
              >
                <FiUser className="sidebar-icon" />
                <span>Profil</span>
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/agentInterface/staff"
                  className={({ isActive }) =>
                    `sidebar-sublink ${isActive ? "active" : ""}`
                  }
                >
                  <FiUsers className="sidebar-icon" />
                  <span>Staff</span>
                </NavLink>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={handleLogout}
        >
          <FiLogOut className="sidebar-icon" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
