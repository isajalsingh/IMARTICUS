import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error(error));
  }, []);

  const fetchCourseById = (id) => {
    axios.get(`http://localhost:5000/api/courses/${id}`)
      .then((response) => setSelectedCourse(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <Sidebar />
      <h1>Courses</h1>
      {courses.map((course) => (
        <div key={course._id} className="card mt-3">
          <div className="card-body">
            <h5>{course.title}</h5>
            <button onClick={() => fetchCourseById(course._id)}>View Details</button>
          </div>
        </div>
      ))}
      {selectedCourse && (
        <div className="mt-5">
          <h2>Course Details</h2>
          <p>Title: {selectedCourse.title}</p>
          <p>Batch: {selectedCourse.batch}</p>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
```

import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>IMARTICUS LEARNING</h2>
      <div className="user-section">
        <button>Get help</button>
        <span>Sajal Kumar Ujjwal</span>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>Course</li>
        <li>Discussion</li>
      </ul>
      <button className="help-button">Get help</button>
    </div>
  );
};

export default Sidebar;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}