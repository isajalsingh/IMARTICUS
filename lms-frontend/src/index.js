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
