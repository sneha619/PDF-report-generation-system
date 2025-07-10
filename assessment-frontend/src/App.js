import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ReportGenerator from './pages/ReportGenerator';
import ViewReport from './pages/ViewReport';
import LandingPage from './pages/LandingPage';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { AuthProvider } from './context/AuthContext';

import AuthContext from './context/AuthContext';

// Redirect component for authenticated users
const RedirectIfAuthenticated = ({ children }) => {
  const { currentUser, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '80vh' }}>
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={
              <RedirectIfAuthenticated>
                <LandingPage />
              </RedirectIfAuthenticated>
            } />
            <Route path="/login" element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            } />
            <Route path="/signup" element={
              <RedirectIfAuthenticated>
                <Signup />
              </RedirectIfAuthenticated>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/generate-report" element={
              <ProtectedRoute>
                <ReportGenerator />
              </ProtectedRoute>
            } />
            <Route path="/view-report/:filePath" element={
              <ProtectedRoute>
                <ViewReport />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;