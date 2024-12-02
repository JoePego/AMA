import React, { useState } from 'react';

function Header({ username, onLogout }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDarkModeOptionsOpen, setDarkModeOptionsOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleDarkModeOptions = () => setDarkModeOptionsOpen(!isDarkModeOptionsOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="title" style={{ display: 'inline-flex' }}>
          <button id="expand-sidebar" data-tippy-content="Open Sidebar">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 20H7V4H21V20ZM19 18H9V6H19V18Z"
                fill="currentColor"
              />
              <path d="M3 20H5V4H3V20Z" fill="currentColor" />
            </svg>
          </button>
          <h3>GPT.ai</h3>
        </div>

        <div className="profile">
          <div className="profile-menu-container">
            <button className="profile-icon" onClick={toggleMenu}>
              <svg
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h6>{username}</h6>
            </button>

            {isMenuOpen && (
              <div className="popup-menu scale-in-tr">
                <ul>
                  <li>
                    <a href="#">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Profile
                    </a>
                  </li>

                  <li className="dark-mode-toggle" onClick={toggleDarkModeOptions}>
                    Theme
                    <ul
                      id="dark-mode-options"
                      className={`dark-mode-options ${isDarkModeOptionsOpen ? 'swing-in-top-fwd' : ''}`}
                    >
                      <li id="light-mode">Light</li>
                      <li id="dark-mode">Dark</li>
                    </ul>
                  </li>

                  <li onClick={onLogout}>
                    <a href="#">
                      <svg
                        width="1.5em"
                        height="2em"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                      >
                        <path
                          d="M12 12H19M19 12L16 15M19 12L16 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
