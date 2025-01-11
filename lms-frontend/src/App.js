// filepath: lms-frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CourseContent from './components/CourseContent';
import './App.css';
import CoursePage from './pages/CoursePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<CourseContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;