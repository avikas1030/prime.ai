import React, { useEffect } from 'react'
import {Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { debugAuth } from './utils/authDebug'
import ProtectedRoute from './components/ProtectedRoute'

import { Navigate } from 'react-router-dom'

const App = () => {
  useEffect(() => {
    console.log("🚀 App initialized");
    debugAuth();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
