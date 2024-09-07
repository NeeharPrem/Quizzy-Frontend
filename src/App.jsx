import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import QuizMain from './pages/QuizMain';
import Quiz from './pages/Quiz';
import Create from './pages/Create';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='/quizzess' element={<QuizMain/>}/> */}
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/create'  element={<Create/>}/>
      </Routes>
    </Router>
  );
}

export default App;
