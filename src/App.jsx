import React, { useState, useEffect } from "react";
import { CgSidebar } from "react-icons/cg";
import DarkModeToggle from './DarkModeToggle';
import ChatInterface from "./ChatInterface";
import Sidebar from "./Sidebar";
import Tooltip from './Tooltip';
import ProfileDropdown from "./ProfileDropdown";

// Main App Component
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width and set mobile state
    const checkMobileView = () => {
      setIsMobile(window.innerWidth < 767);
      
      // If mobile, close sidebar by default
      if (window.innerWidth < 767) {
        setIsSidebarOpen(false);
      } else {
        // For desktop, open sidebar by default
        setIsSidebarOpen(true);
      }
    };

    // Check initial width
    checkMobileView();

    // Add resize listener
    window.addEventListener('resize', checkMobileView);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <div className="bg-stone-50 font-inter flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="top-0 dark:bg-zinc-800 dark:border-dark-700 p-2.5 flex justify-between items-center">
          <Tooltip content="Open Sidebar" placement="bottom">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-dark-600 p-0.5 hover:bg-zinc-200 focus:outline-none rounded-md transition-display duration-400"
            >
              {!isSidebarOpen && (
                <CgSidebar size={28} />
              )}
            </button>
          </Tooltip>
          <div className="flex items-center">
            <h1 className="text-xl font-jost font-semibold text-gray-800 dark:text-gray-100">
              AMA.ai
            </h1>
          </div>
          <div className="flex justify-end">
            <div className="profile flex items-center p-1 rounded-full">
              <ProfileDropdown />              
            </div>
            <div className="flex items-center p-1 rounded-full">
              <button>
                <DarkModeToggle />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <ChatInterface />
      </div>
    </div>
  );
};

export default App;