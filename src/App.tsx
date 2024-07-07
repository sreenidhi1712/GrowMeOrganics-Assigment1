import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Protectedroute from './Protectedroute'; // Adjust the path as per your file structure
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('userDetails');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/second" replace /> : <LoginPage />} />
        <Route element={<Protectedroute />}>
          <Route path="/second" element={<SecondPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
