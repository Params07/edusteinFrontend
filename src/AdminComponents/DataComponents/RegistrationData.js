import React, { useEffect, useState } from 'react';
import useGet from '../Hooks/Get';

const RegistrationData = ({ bootcampId }) => {
  const [registrationsData, setRegistrationsData] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const url = bootcampId !== 0 ? `${process.env.REACT_APP_BACKEND_URL}/registrations/registrations?bootcampId=${bootcampId}` : null;

  const { fetchData, data, loading, error } = useGet(url);

  useEffect(() => {
    if (bootcampId !== 0) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [bootcampId]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch, fetchData]);

  useEffect(() => {
    if (data) {
      setRegistrationsData(data);
    }
  }, [data]);

  return registrationsData;
};

export default RegistrationData;
