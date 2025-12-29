import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronUp, FaChevronDown, FaPlus } from "react-icons/fa";
import { navItems } from "./NavItems";
import { LuLock, LuLockOpen } from "react-icons/lu";

const LeftNav: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleToggle = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMouseEnter = () => {
    if (!isLocked) setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!isLocked) setIsCollapsed(true);
  };

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col justify-between bg-gray-900 
      ${isCollapsed ? "w-16 px-0" : "w-64 px-0"} 
      min-h-screen py-6 duration-300 relative`}
    >
      <div>
        <div
          className={`flex items-center gap-2 px-4 ${
            isCollapsed ? "justify-center" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-400 rounded-full"></div>
            <div className="h-3 w-3 bg-red-400 rounded-full"></div>
          </div>
          {!isCollapsed && (
            <span className="text-white text-lg font-semibold">
              ProJect Vault
            </span>
          )}
        </div>

        <div
          className={`flex flex-col items-center transition-all duration-300 mt-4 ${
            isCollapsed ? "px-2" : "px-6"
          }`}
        >
          <img
            src="https://i.pravatar.cc/100"
            className={`rounded-full transition-all border-2 p-1 border-green-300 shadow-md
            ${isCollapsed ? "w-12 h-12" : "w-20 h-20"}`}
          />

          {!isCollapsed && (
            <>
              <h2 className="text-white text-[16px] font-semibold mt-3">
                Hemant Medhsia
              </h2>
            </>
          )}
        </div>

        {/* Menu */}
        <ul className="space-y-1.5 mt-4 px-2">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <>
                  {/* Parent button */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="flex items-center w-full gap-3 p-2 rounded-lg 
                    text-white hover:text-green-400 hover:bg-green-400/20"
                  >
                    <span className="text-xl">{item.icon}</span>

                    {!isCollapsed && (
                      <>
                        <span className="text-[15px]">{item.name}</span>
                        <span className="ml-auto text-green-400">
                          {openMenus[index] ? (
                            <FaChevronUp size={14} />
                          ) : (
                            <FaChevronDown size={14} />
                          )}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Sub-menu */}
                  {!isCollapsed && (
                    <ul
                      className={`ml-10 mt-1 space-y-2 transition-all overflow-hidden ${
                        openMenus[index]
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.children.map((child, i) => (
                        <NavLink
                          key={i}
                          to={child.path!}
                          className="flex items-center gap-2 text-white/80 hover:text-white"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                          {child.name}
                        </NavLink>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg ${
                      isActive
                        ? "bg-green-400/20 text-green-400"
                        : "text-white hover:bg-green-400/20 hover:text-green-400"
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="text-[15px]">{item.name}</span>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </ul>
      </div>

      {!isCollapsed && (
        <div className="hover:bg-green-400/20 border-2 border-dashed border-green-400/40 rounded-2xl p-4 flex items-center justify-center flex-col mx-4">
          <p className="text-white">Add files</p>
          <p className="text-xs text-green-300">Up to 20 GB</p>

          <button className="mt-3 flex justify-center items-center bg-green-400/20 text-green-400 rounded-full w-10 h-10 text-md">
            <FaPlus></FaPlus>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsLocked(!isLocked)}
        className={`absolute ${
          isCollapsed ? "bottom-4 right-3" : "bottom-1 -right-4"
        } p-2 rounded-full ${
          isLocked ? "text-green-400" : "bg-red-400/20 text-red-400"
        }`}
      >
        {isLocked ? <LuLock /> : <LuLockOpen />}
      </button>
    </nav>
  );
};

export default LeftNav;
