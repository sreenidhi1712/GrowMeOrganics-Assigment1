import React from 'react';
import LoginPage from './components/LoginPage';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protectedroute from './Protectedroute'; 
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      <Route  element={<Protectedroute />}>
      <Route path="/second" element={<SecondPage />} />
      </Route>
      </Routes>
      
      </Router>
    </>
  );
}

export default App;
