import { useState,useEffect } from 'react';
import axios from 'axios';

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const isFormData = data instanceof FormData;
      console.log(isFormData)
      const response = await axios.post(url, data, {
        withCredentials: true, 
        headers: isFormData ? {
          'Content-Type': 'multipart/form-data',
        } : {
          'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };
  

  return { post, loading, error };
};

export default usePost;
