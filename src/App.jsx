import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import Quiz from './pages/Quiz';
import Create from './pages/Create';
import Report from './pages/Report';
import AdminPanel from './pages/admin/AdminPanel';
import CreateQuiz from './components/admin/CreateQuiz';
import AdminSignup from './components/admin/AdminSignup';
import AdminLogin from './components/admin/AdminLogin';

// Protected route component
const ProtectedRoute = ({ element, admin }) => {
  return admin ? element : <Navigate to="/admin/login" replace />;
};

function App() {
  const admin = useSelector(state => state.quiz.adminLoggedin);
  const userName = useSelector(state => state.quiz.name);
  return (
    <Router>
      <Routes>
        {/* user routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/create' element={<Create />} />
        <Route path='/report' element={userName ? <Report /> : <Navigate to="/" />} />

        {/* Admin routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<ProtectedRoute element={<AdminPanel />} admin={admin} />} />
        <Route path='/admin/create' element={<ProtectedRoute element={<CreateQuiz />} admin={admin} />} />
        <Route path='/admin/signup' element={<ProtectedRoute element={<AdminSignup />} admin={admin} />} />
      </Routes>
    </Router>
  );
}

export default App;