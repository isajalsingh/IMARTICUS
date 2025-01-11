const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course'); // Assuming you have a Course model

// Fetch all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

// Fetch a specific course by courseId
router.get('/:courseId', async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId(req.params.courseId);
    const course = await Course.findOne({ 'courseId': courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
});

module.exports = router;