const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course'); // Assuming you have a Course model
const Assignment = require('../models/Assignment'); // Assuming you have an Assignment model
const Chapter = require('../models/Chapter'); // Assuming you have a Chapter model
const Lecture = require('../models/Lecture'); // Assuming you have a Lecture model
const Quiz = require('../models/Quiz'); // Assuming you have a Quiz model




router.get('/:courseid', async (req, res) => {
  console.log('hello world');
  console.log(req.params);
  console.log(req.params.courseid);
  let abc = req.params.courseid;
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseid);
    console.log(courseId);
    const course = await Course.find();
    console.log(course);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const chapters = await Chapter.find({ courseId: courseId });
    console.log(chapters);
    const chapterIds = chapters.map(chap => chap._id);
    console.log(chapterIds);

    const assignments = await Assignment.find({ chapterId: { $in: chapterIds } });
    console.log(assignments);
    const lectures = await Lecture.find({ chapterId: { $in: chapterIds } });
    console.log(lectures);
    const quizzes = await Quiz.find({ chapterId: { $in: chapterIds } });
    console.log(quizzes);

    const contentMap = {};

    assignments.forEach(assignment => {
      if (!contentMap[assignment.chapterId]) {
        contentMap[assignment.chapterId] = { assignments: [], lectures: [], quizzes: [] };
      }
      contentMap[assignment.chapterId].assignments.push(assignment);
    });

    lectures.forEach(lecture => {
      if (!contentMap[lecture.chapterId]) {
        contentMap[lecture.chapterId] = { assignments: [], lectures: [], quizzes: [] };
      }
      contentMap[lecture.chapterId].lectures.push(lecture);
    });

    quizzes.forEach(quiz => {
      if (!contentMap[quiz.chapterId]) {
        contentMap[quiz.chapterId] = { assignments: [], lectures: [], quizzes: [] };
      }
      contentMap[quiz.chapterId].quizzes.push(quiz);
    });

    chapters.forEach(chapter => {
      chapter.content = contentMap[chapter._id] || { assignments: [], lectures: [], quizzes: [] };
    });

    res.json(chapters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching course content', error });
  }
});

module.exports = router;