import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useResume } from './context/ResumeContext';
import AuthPage from './pages/AuthPage';
import TemplateSelectorPage from './pages/TemplateSelectorPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import LandingPage from './pages/Landingpage';


import DashboardPage from './pages/DashboardPage';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useResume();

  if (loading) return null; // Context handles global spinner via main.jsx
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardPage /></ProtectedRoute>
        } />
        <Route 
          path="/select-template" 
          element={
            <ProtectedRoute>
              <TemplateSelectorPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/build" 
          element={
            <ProtectedRoute>
              <ResumeBuilderPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};


export default App;