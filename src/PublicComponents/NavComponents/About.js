import React from "react";

const About = () => {
    return (
        <>
            <div id="about" className="section h-full bg-[#0c2543] flex flex-col gap-6 lg:flex-row lg:space-x-14 
            md:pl-8 md:pr-8 lg:pl-16 pt-12 lg:pr-16 place-items-center pr-4 pl-4">
            <div className="w-full h-full lg:w-1/2 flex items-center justify-center  lg:pl-0 order-1 
            lg:order-0 ">
            <img className="object-contain lg:w-[24rem] w-[20rem] h-[20rem]  md:w-[24rem] md:h-[26rem] lg:h-[26rem] " src="/images/image3.png" alt="About Us Image" />
</div>

                
                <div className="font-redhat text-white w-full lg:w-1/2 grid gap-4 md:gap-6 lg:order-1 order-0">
                    <div>
                        <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl">
                            Who We Are?
                        </span>
                    </div>
                    <div>
                        <span className="font-normal text-sm sm:text-lg md:text-xl  ">
                            At Edustein, we provide Boot Camps designed to simplify your exploration of professional fields, 
                            leading you towards better clarifications through high-level understanding. Dive into visually-enhanced 
                            learning experiences that inspire creativity and fuel achievement. Join our community today to unlock your 
                            potential and journey towards a brighter future with us.
                        </span>
                    </div>
                </div>
               
            </div>
        </>
    );
}

export default About;
