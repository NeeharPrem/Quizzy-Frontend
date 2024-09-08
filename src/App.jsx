import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import Quiz from './pages/Quiz';
import Create from './pages/Create';
import Report from './pages/Report';
import { useSelector } from 'react-redux';
import AdminPanel from './pages/admin/AdminPanel';
import CreateQuiz from './components/admin/CreateQuiz';

function App() {
  const userName = useSelector(state => state.quiz.name);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/create'  element={<Create/>}/>
        <Route path='/report' element={userName ? <Report /> : <Navigate to="/" />} />
        {/* <Route path='/admin' element={isAdmin ? <Admin /> : <Navigate to="/" />} /> */}
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/admin/create' element={<CreateQuiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;