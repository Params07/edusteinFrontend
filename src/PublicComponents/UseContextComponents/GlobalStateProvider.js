import React, { createContext, useState } from 'react';


const GlobalStateContext = createContext();


const GlobalStateProvider = ({ children }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [bootcampId,setBootcampId] =useState(0);
  const openRegisterForm = () => setShowRegisterForm(true);
  const closeRegisterForm = () => setShowRegisterForm(false);

  return (
    <GlobalStateContext.Provider value={{ showRegisterForm, openRegisterForm, closeRegisterForm,bootcampId,setBootcampId }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
