import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Home() {
 
  
  return (
    <div
      id="home"
      className="section grid lg:gap-0 gap-8 pb-8 pt-28 h-full sm:pt-44 lg:px-16 bg-[#0c2543] lg:flex lg:space-x-10 lg:h-screen w-full"
    >
      <div className="px-4 sm:px-16 lg:px-0 grid gap-10 lg:gap-6 lg:w-[60%]">
        <div className="w-max h-8">
          <span className="pl-6 pb-3 pt-3 pr-6 text-xl sm:text-2xl bg-line text-white font-redhat font-semibold rounded-l-full rounded-r-full">
            Craft Your Clarified Era..
          </span>
        </div>
        <div>
          <span className="text-white font-semibold font-redhat text-xl sm:text-2xl">
            Feeling confused about
            <br />
            your career path?
          </span>
        </div>
        <div className="text-white font-redhat font-normal text-lg md:text-xl">
          <span>
            Our EduStein's Bootcamps provide clarity through engaging content.
            <br />
            Join us to navigate your future with confidence!
          </span>
        </div>
        <div className="p-2 bg-white max-w-96 md:max-w-80 min-w-max w-72 md:w-96 h-12 md:h-20 rounded-l-full rounded-r-full flex items-center">
          <div className="text-center space-x-6 w-full flex items-center">
            <span className="font-redhat font-semibold md:font-bold text-2xl text-navItems flex-grow text-center">
              Be an EduStein
            </span>
            <span className="ml-auto bg-line rounded-full h-10 w-10 md:h-14 md:w-14 text-2xl font-semibold grid place-items-center cursor-pointer">
              
                <FaArrowRight />
             
            </span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex items-center justify-center p-4 md:p-0">
        <img
          className="object-contain w-64 sm:w-[24rem] sm:h-[24rem] xl:h-[85%]"
          src="/images/image3.png"
          alt="About Us Image"
        />
      </div>
    </div>
  );
}

export default Home;
