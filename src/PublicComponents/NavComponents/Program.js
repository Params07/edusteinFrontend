import React, { useEffect, useState } from "react";
import BootcampCards from "../BootcampComponents/BootcampCards";
import CardDetails from "../BootcampComponents/CardDetails";
import useGet from "../../Hooks/UseGet";
import ProgramContents from "../ProgramComponents/ProgramContents";
import ActiveBootcamps from "../BootcampComponents/ActiveBootcamps";

const Program = () => {
   

    return (
        <div id="program" className="bg-[#0c2543] w-full ">
          <div className="px-4  sm:px-6 md:px-14 py-8 "><ProgramContents/></div> 
           <ActiveBootcamps/>
        </div>
    );
}

export default Program;
