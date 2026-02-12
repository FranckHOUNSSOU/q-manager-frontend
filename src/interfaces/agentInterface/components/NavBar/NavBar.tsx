import { useState, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { getUser } from "../../../../api/auth";
import "./NavBar.css";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
}

function UserAvatar({ firstName, lastName }: UserAvatarProps) {
  const initials = useMemo(() => {
    const first = firstName?.charAt(0)?.toUpperCase();
    const last = lastName?.charAt(0)?.toUpperCase();
    return first + last ;
  }, [firstName, lastName]);

  const fullName = useMemo(() => {
    return `${firstName} ${lastName}`.trim();
  }, [firstName, lastName]);

  const bgColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    return "#" + (hash >>> 0).toString(16).padStart(6, "0").slice(0, 6);
  }, [initials]);

  return (
    <div className="navbar-user-info">
      <div 
        className="navbar-avatar" 
        style={{ backgroundColor: bgColor }}
      >
        {initials}
      </div>
      <span className="navbar-user-name">{fullName}</span>
    </div>
  );
}

function NavBar() {
  //const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  
  const user = getUser();

  return (
    <header className="agent-navbar">
      <div className="navbar-spacer" />
      <div className="navbar-actions">
        {/*<div className="navbar-dropdown-wrapper">
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
        </button>*/}

        <div className="navbar-dropdown-wrapper">
          <button
            type="button"
            className="navbar-btn navbar-user"
            onClick={() => setUserOpen(!userOpen)}
            aria-expanded={userOpen}
          >
            {user ? (
              <UserAvatar firstName={user.firstName} lastName={user.lastName} />
            ) : (
              <div className="navbar-avatar">U</div>
            )}
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
