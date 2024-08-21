// BootCampData.js
import { useEffect, useState } from 'react';
import useGet from '../Hooks/Get';

const useBootCampData = (bootcampId) => {
  const [bootcampData, setBootcampData] = useState(null);
  const url = bootcampId !== 0 ? `${process.env.REACT_APP_BACKEND_URL}/bootcamps/bootcamp?id=${bootcampId}` : null;
  const { fetchData, data, loading, error } = useGet(url);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  useEffect(() => {
    if (data) {
      setBootcampData(data);
    }
  }, [data]);

  return { bootcampData, loading, error };
};

export default useBootCampData;
