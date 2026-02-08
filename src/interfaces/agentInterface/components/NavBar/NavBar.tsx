import { useState } from "react";
import { FiGrid, FiChevronDown } from "react-icons/fi";
import "./NavBar.css";

function NavBar() {
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="agent-navbar">
      <div className="navbar-spacer" />
      <div className="navbar-actions">
        <div className="navbar-dropdown-wrapper">
          <button
            type="button"
            className="navbar-btn navbar-lang"
            onClick={() => setLangOpen(!langOpen)}
            aria-expanded={langOpen}
          >
            <span className="navbar-lang-flag">🇺🇸</span>
            <span>English</span>
            <FiChevronDown className="navbar-chevron" />
          </button>
          {langOpen && (
            <div className="navbar-dropdown">
              <button type="button">English</button>
              <button type="button">Français</button>
            </div>
          )}
        </div>

        <button type="button" className="navbar-btn navbar-grid" aria-label="Menu">
          <FiGrid size={20} />
        </button>

        <div className="navbar-dropdown-wrapper">
          <button
            type="button"
            className="navbar-btn navbar-user"
            onClick={() => setUserOpen(!userOpen)}
            aria-expanded={userOpen}
          >
            <span className="navbar-avatar">A</span>
            <FiChevronDown className="navbar-chevron" />
          </button>
          {userOpen && (
            <div className="navbar-dropdown navbar-dropdown-right">
              <button type="button">Profil</button>
              <button type="button">Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
