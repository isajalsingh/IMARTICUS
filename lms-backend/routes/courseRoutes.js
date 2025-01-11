const express = require('express');
const Course = require('../models/Course');
const Chapter = require('../models/Chapter');
const Lecture = require('../models/Lecture');
const Assignment = require('../models/Assignment');
const Quiz = require('../models/Quiz');

const router = express.Router();

// Fetch all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

// Fetch chapters by course ID
router.get('/:courseId/chapters', async (req, res) => {
  try {
    const chapters = await Chapter.find({ courseId: req.params.courseId });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chapters', error });
  }
});

// Fetch lectures, assignments, and quizzes by chapter ID
router.get('/:chapterId/details', async (req, res) => {
  try {
    const lectures = await Lecture.find({ chapterId: req.params.chapterId });
    const assignments = await Assignment.find({ chapterId: req.params.chapterId });
    const quizzes = await Quiz.find({ chapterId: req.params.chapterId });

    res.json({ lectures, assignments, quizzes });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching details', error });
  }
});

// Fetch a specific course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
});

module.exports = router;

