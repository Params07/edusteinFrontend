import React, { useEffect, useState, startTransition } from "react";
import BootcampCards from "../BootcampComponents/BootcampCards";
import CardDetails from "../BootcampComponents/CardDetails";
import useGet from "../../Hooks/UseGet";
import { GlobalStateProvider } from "../UseContextComponents/GlobalStateProvider";
import Register from "../NavComponents/Register";

const ActiveBootcamps = () => {
  const [displayCard, setDisplayCard] = useState(true);
  const [id, setId] = useState(0);
  const { fetchData, data, loading, error } = useGet(`${process.env.REACT_APP_BACKEND_URL}/data/bootcamp`);
  const [d1,setd1] = useState();

  useEffect(() => {
    startTransition(() => {
      fetchData();
    });
  }, [fetchData]);
 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <GlobalStateProvider>
     
       
        <div className="px-4 sm:px-6 md:px-12  h-full  py-2 sm:py-8  shadow-lg">
          {displayCard ? (
            <div className="h-full bg-gray-100 sm:pb-10 w-full px-0 sm:px-4 py-2 sm:py-4 rounded-md ">
              <p className="text-black text-center text-3xl font-bold font-redhat  py-4  sm:py-8">
                OUR Bootcamps
              </p>
              <BootcampCards
                data={data}
                setDisplayCard={setDisplayCard}
                setId={setId}
              />
            </div>
          ) : (
            <CardDetails setDisplayCard={setDisplayCard} details={data[id]} />
          )}
        </div>
      
      <Register/>
    </GlobalStateProvider>
  );
};

export default ActiveBootcamps;
