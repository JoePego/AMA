import React from "react";
import { SquarePen } from "lucide-react";
import { CgSidebarRight } from "react-icons/cg";
import Tooltip from "./Tooltip";
import ActionsDropdown from "./components/ActionsDropdown";
import useAddSession from "./components/useAddSession";

const Sidebar = ({ isSidebarOpen, toggleSidebar, isMobile }) => {
  const { sessions, addSession } = useAddSession();
  return (
    <>
      {/* Overlay for mobile screens */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          ${
            isMobile
              ? `fixed w-64 left-0 top-0 bottom-0 z-50 transform transition-transform duration-300 
               ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
              : `${isSidebarOpen ? "w-64" : "w-0"} 
               border-r border-gray-200 dark:border-dark-700 shadow-inner ease-in-out transition-width duration-300`
          }
          bg-zinc-200 dark:bg-zinc-900 
          h-full
        `}
      >
        <div className="py-4 px-3">
          {/* Sidebar Toggle Button */}
          <div className="p-0 flex justify-between items-center">
            <Tooltip content="Close Sidebar" placement="right">
              <button
                onClick={toggleSidebar}
                className="text-gray-800 dark:text-zinc-200 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-dark-600 p-0.5 hover:bg-zinc-300 focus:outline-none rounded-md"
              >
                <CgSidebarRight size={28} />
              </button>
            </Tooltip>
            <Tooltip content="New Chat" placement="bottom">
              <button
                onClick={addSession}
                className="text-gray-800 dark:text-zinc-200 dark:hover:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-dark-600 hover:duration-200 p-0.5 hover:bg-zinc-300 focus:outline-none rounded-md"
              >
                {isSidebarOpen && <SquarePen size={22} />}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="mx-1 font-karla">
          <ul className="flex gap-1 flex-col overflow-y-auto max-h-[calc(100vh-75px)] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-600">
            {isSidebarOpen &&
              sessions.map((session) => (
                <>
                  <li
                    key={session.id}
                    className="rounded-lg flex justify-between px-1 hover:bg-gray-100 dark:hover:text-gray-200 dark:text-gray-300 dark:hover:bg-neutral-700 flex items-center"
                  >
                    <div className="p-0.5 truncate">
                      <span>{session.name}</span>
                    </div>
                    <Tooltip content={"More Options"} placement="right">
                      <div aria-label="more" className="inline-flex">
                        <ActionsDropdown />
                      </div>
                    </Tooltip>
                  </li>
                </>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
