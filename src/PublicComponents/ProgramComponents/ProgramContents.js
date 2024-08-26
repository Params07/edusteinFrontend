import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";


function ProgramContents() {
  const [currId, setCurrId] = useState(0);

  const programs = [
    {
      title: "Core Craft",
      src: "images/image5.png",
      slogan:"Build your career with right plan",
      content:"The core framework is designed to clarify foundational knowledge in any domain. Its goal is to establish a basic understanding through visual learning methods. By focusing on this structured approach, the learning process aims to reinforce key concepts, allowing you to build a strong visual representation of the subject. This visual foundation serves as a crucial stepping stone, enabling deeper and more comprehensive learning as you progress in your studies."
    },
    {
      title: "Path Craft",
      src: "images/image2.png",
      slogan:"Embrace the freedom to chart your own course.",
      content:"Are you unsure about which domain to choose? We know that selecting the right one can be challenging. In this intensive program, we aim to guide you through the exciting journey of discovering and choosing your area of interest. Grasping the basics is essential, and this bootcamp is designed to provide you with the tools, insights, and resources needed to make an informed decision about your professional path. \n\nBy the end of the bootcamp, you will have a clearer understanding of your interests, strengths, and aspirations, along with concrete action plans to pursue your chosen domain with confidence."
    },
    {
      title: "Mastery Craft",
      src: "images/iamge7.png",
      slogan:"Turn doubt into growth, flex your skills with advanced techniques",

      content:"To become skilled and knowledgeable in a specific area, our platform offers self-learners the flexibility to learn at their own pace while mastering advanced techniques. Instead of committing to a full course, you can use MasterCraft to bridge the gap between your doubts and self-growth. Whether it's specialized tools, complex processes, or innovative methods, MasterCraft empowers you to stay updated on new developments, continuously refine your skills, and confidently experiment with new ideas."
    },
    {
      title: "Expert Talk",
      src: "images/image4.png",
      slogan:"Learn from the best to become your best",
      content:"The Expert Talk program is organized to facilitate direct engagement with industry professionals, providing participants with the opportunity to enhance their industry-specific skills. By interacting with seasoned experts, attendees gain valuable insights that can help them stay updated on the latest trends, best practices, and innovations in their field. Moreover, this program encourages the adoption and maintenance of professional discipline, helping participants develop structured routines and practices that contribute to their ongoing personal and professional development.    "
    },
  ];

  const handleTabChange = (index) => {
    setCurrId(index);
  };

  return (
    <div id="program" className="w-full rounded-2xl shadow-lg bg-white font-redhat px-2 py-2">
      <div className="w-full flex  h-16 bg-white sm:bg-line rounded-lg ">
      <div className="block sm:hidden custom-shadow h-full flex  items-center ">
            <FaChevronCircleLeft  onClick={()=>{currId  >= 1 ? setCurrId(currId-1):setCurrId(currId)}} className={` text-3xl ${currId  >= 1 ? 'cursor-pointer':''} `}/>
          </div>
        {programs.map((data, id) => (
         
          
          <div
            key={id}
            className={`w-full sm:w-1/4 flex items-center justify-center h-full cursor-pointer  
                ${currId === id ? " bg-white items-start sm:rounded-tl-2xl sm:rounded-tr-2xl  custom-shadow m-2   " : " hidden  sm:flex"} 
                transition-all duration-500`}
            onClick={() => setCurrId(id)}
           
            
          >
            <p 
  className={`text-black text-lg relative tab-border ${
    currId !== id 
      ? "font-semibold ease-in-out  duration-100 scale-[80%]" 
      : "font-bold ease-in-out duration-200 animate-border"
  }`}
>
  {data.title}
</p>
 </div>
          
         
         
          
        ))}
         <div className="block sm:hidden custom-shadow h-full flex  items-center ">
            <FaChevronCircleRight  onClick={()=>{currId + 1 < programs.length? setCurrId(currId+1):setCurrId(currId)}} className={` text-3xl ${currId + 1 < programs.length ? 'cursor-pointer':''}`} />
          </div>
      </div>

      <SwipeableViews
        index={currId}
        onChangeIndex={handleTabChange}
        enableMouseEvents
        springConfig={{
          duration: "0.5s",
          easeFunction: "ease-out",
          delay: "0s",
        }}
        slideClassName="h-full" 
      >
        {programs.map((program, id) => (
          <div key={id} className="bg-white h-full  min-h-[580px] sm:min-h-max w-full">
            <div className="flex flex-col lg:flex-row h-full lg:space-x-16 p-2 sm:p-4 md:p-8 w-full ">
              <div className="flex h-full items-center justify-center p-4 w-full  lg:max-w-sm">
                <img
                  src={program.src}
                  alt={program.title}
                  className="w-48 sm:max-w-sm h-48 sm:h-84 rounded-lg  object-contain"
                />
              </div>
              <div className="  h-full  flex flex-col p-0 sm:p-4 justify-center  lg:h-auto">
                <h2 className="text-2xl font-bold mb-4">{program.title}</h2>
                <p className="text-gray-700 text-sm sm:text-base ">{program.content.split('\n\n').map((text, i) => (
                        <span key={i}>{text}
                                   <br />
                                   <br />
                                     </span>
                                    ))}</p>            
                                  <p className="text-center font-bold ">&quot;{program.slogan}&quot;</p>
              </div>
            </div>
          </div>
        ))}
      </SwipeableViews>
    </div>
  );
}

export default ProgramContents;
