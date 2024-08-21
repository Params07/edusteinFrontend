import React from 'react';
import Carousel from 'react-elastic-carousel';
import { format } from 'date-fns';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const BootcampCards = ({ data = [], setDisplayCard, setId }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy, hh:mm a");
  };

  
  const handleClick = (id) => {
    setDisplayCard(false);
    setId(id);
    console.log(id);
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 }
  ];

  return (
    <Carousel
      breakPoints={breakPoints}
      pagination={false}
      
    >
      {data && data.length > 0 ? (
        data.map((camp, index) => (
          <div key={index} className='h-[420px]  '>
            <div
              className="max-w-sm h-[390px] rounded-2xl bg-white font-redhat cursor-pointer  border-2 border-gray-200 flex flex-col "
              onClick={() => handleClick(index)}
            >
              <div className="h-56">
                <img className="w-full h-full rounded-t-2xl" src={camp.image_path} alt={`${camp.title} Image`} />
              </div>
              <div className="p-4 flex flex-col space-y-4">
                <p className="text-gray-700">{formatDate(camp.start_date)}</p>
                <h5 className="font-bold text-xl mb-2">{camp.title}</h5>
                <div>
                  <button className="inline-block border-2 border-line hover:bg-white hover:text-line bg-line rounded-full px-3 py-1 text-sm font-semibold text-white flex space-x-1 items-center">
                    <span>Register</span><FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No bootcamps available.</p>
      )}
    </Carousel>
  );
};

export default BootcampCards;
