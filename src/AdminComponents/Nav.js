import React, { useState } from 'react';
import { VscThreeBars } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive';


const Nav = ({ NavComponents, action, currentNav }) => {
    const [showNav,setShowNav] = useState(false)
    const isLessThanMd = useMediaQuery({ query: '(max-width: 767px)' }); 
 
  const handleNavClick = (id) => {
    action(id);
    if (isLessThanMd) {
      setShowNav(!showNav);
    }
  };
  return (
    <div className={`w-full  md:w-64  md:h-screen bg-black fixed shadow-md shadow-black pt-0 md:pt-20  ${showNav?"h-screen":"h-14 "}`}>
         <div className="transition-transform duration-700 p-4  bloack md:hidden text-white "  >
              {showNav ? <IoCloseSharp className="text-2xl cursor-pointer" onClick={()=>setShowNav(!showNav)} /> : <VscThreeBars className=" cursor-pointer text-2xl" onClick={()=>setShowNav(!showNav)} />}
            </div>
      <ul className={`font-semibold text-xl flex flex-col space-y-8 md:space-y-16 justify-center items-center px-4  md:block ${showNav?"block":'hidden'}`}>
     
        {NavComponents.map(({ id, label }) => (
          <li
            key={id}
            className={`p-2 w-full max-w-sm text-center cursor-pointer hover:bg-gray-700 text-white rounded-md ${
              currentNav === id ? "bg-gray-700 text-white" : ""
            }`}
             onClick={() => handleNavClick(id)}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
