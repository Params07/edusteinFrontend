import React, { useState, useEffect, Suspense, lazy } from 'react';
import Nav from './Nav.js';

function AdminPage() {
  const [navComponents, setNavComponents] = useState([]);
  const [currentNav, setCurrentNav] = useState(1);
  const [components, setComponents] = useState({});
  useEffect(() => {
    
    const fetchNavItems = async () => {
     
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nav-items`, {
          method: 'GET',
          credentials: 'include' 
        });
        const data = await response.json();
        console.log(data);
       
        const loadedComponents = {};
        for (const item of data) {
         
          loadedComponents[item.id] = lazy(() => import(`${item.component_path}`));
        }

        setNavComponents(data);
        setComponents(loadedComponents);
      } catch (error) {
        console.error('Failed to fetch navigation items:', error);
      }
    };

    fetchNavItems();
  }, []);

  const CurrentComponent = components[currentNav];

  return (
    <div>
      <Nav 
        NavComponents={navComponents} 
        action={setCurrentNav}  
        currentNav={currentNav}
      />
      <div className="ml-0 md:ml-64 pt-20 md:pt-0"> 
        <Suspense fallback={<div>Loading...</div>}>
          {CurrentComponent ? <CurrentComponent /> : <div>Select a component</div>}
        </Suspense>
      </div>
    </div>
  );
}

export default AdminPage;
