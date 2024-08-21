import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGet = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, {
        params
        
      });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  return { fetchData, data, loading, error };
};

export default useGet;
