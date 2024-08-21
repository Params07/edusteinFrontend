import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicPage from './PublicComponents/PublicPage';

import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext';
import { lazy } from 'react';
const AdminPage = lazy(() => import('./AdminComponents/AdminPage'));
const Login = lazy(()=>import('./Login'))

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<PublicPage />} />
        
        <Route
          path="*"
          element={
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/adminPage"
                  element={<ProtectedRoute element={<AdminPage />} />}
                />
              </Routes>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
