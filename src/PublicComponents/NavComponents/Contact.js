import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
    return (
      <div   id="contact" className=" section flex flex-col pt-4 box space-y-8 bg-[#0c2543]">
         <div className="   w-full bg-[#0c2543] font-redhat  h-full ">
            <div className="mx-4 md:mx-8 xl:mx-16  shadow-lg  bg-[#2E3B4E] py-6 rounded-lg grid gap-8 place-items-center 2xl:flex 
             grid items-center space-y-4 md:space-y-0 md:space-x-4 
               py-8  px-6 ">
                <div className="items-center  flex justify-center w-full   ">
                    <span className="font-bold text-white text-xl ">
                    Interested in becoming a part-time IT tutor? Share your expertise and shape the future of aspiring professionals!
                    </span>
                </div>
                <div className="flex flex-col 2xl:w-48  sm:max-w-sm w-full">
                <button className=" py-2 border-2 sm:border-4 border-line hover:text-line hover:bg-white 
                 bg-line text-white font-bold rounded-full 3    text-base md:text-xl md:py-3   w-full ">
                        Contact
                    </button>
                    
                </div>
            </div>
        </div>
       
        <div className="h-full bg-[#0c2543] w-full font-redhat">
  <div className="bg-white rounded-t-[45px] lg:px-[64px] md:px-[32px] px-[16px] pt-8 lg:pb-8 flex flex-col space-y-4 lg:flex-row space-x-0 lg:space-x-[150px] xl:space-x-[135px] 2xl:space-x-[460px]">

    <div className="w-full md:w-[25%] flex flex-col space-y-6 sm:space-y-8 cursor-pointer">
      <div>
        <img src="/images/logo.png" alt="Logo" className=" cursor-pointer w-32 h-8 sm:w-42 sm:h-10 object-contain" />
      </div>
      <div className="flex flex-col space-y-2 sm:space-y-4">
        <div className="flex items-center space-x-6 ">
          <span>
            <FaPhoneAlt className=" cursor-pointer text-[#FF6E40] text-xl" />
          </span>
          <a href="tel:+919486115199" className=" cursor-pointer text-lg font-semibold text-[#0c2543]">
            9486115199
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <img className="w-6 sm:h-6" src="/images/gmail.png" alt="Gmail" />
          <a href="mailto:edustein.in@gmail.com" className="text-lg  font-semibold text-[#0c2543]">edustein.in@gmail.com</a>
        </div>
      </div>
    </div>

    <div className="flex flex-col  items-start lg:items-center  w-full">
      <div className="self-start flex items-center lg:h-[85%]">
        <span className="font-redhat text-[44544A] font-semibold md:text-xl lg:text-xl">Ready to learn from industry experts? Our IT professionals are here to guide you and shape your future career. Join us today and experience visual learning!</span>
      </div>
      <div className="pt-4 self-start flex space-x-6 sm:space-x-8 justify-start lg:justify-end items-start lg:items-end h-12 lg:h-24 w-full">
        <div>
          <img className="w-8 h-8 cursor-pointer " src="/images/linkedin.png" alt="LinkedIn" />
        </div>
        <div>
          <img className="w-8 h-8  cursor-pointer" src="/images/instagram.png" alt="Instagram" />
        </div>
        <div>
          <img className="w-8 h-8  cursor-pointer" src="/images/twitter.png" alt="Twitter" />
        </div>
      </div>
    </div>
  </div>
 <div className="p-4 lg:p-2 bg-white">
 <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent dark:via-gray-600"></div>
 </div>
  <div className="bg-white font-redhat text-[44544A] text-center text-sm font-semibold pt-2 pb-4">
        <span>copyrights <span>&copy;</span> 2024 Edustein. All rights reserved</span>
       </div>
</div>
       


      </div>
    );
}



export default Contact;
