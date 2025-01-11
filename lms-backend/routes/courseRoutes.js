const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/Course'); // Assuming you have a Course model
const Assignment = require('../models/Assignment'); // Assuming you have an Assignment model
const Chapter = require('../models/Chapter'); // Assuming you have a Chapter model
const Lecture = require('../models/Lecture'); // Assuming you have a Lecture model
const Quiz = require('../models/Quiz'); // Assuming you have a Quiz model

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
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const chapter = await chapter.find({ courseid: courseId });
    let chapter_id_arr = chapter.map((chap) => chap._id)
    let assignment = await Assignment.find({ chapter_id: { $in: chapter_id_arr } })
    let assignment = await Assignment.find({ chapter_id: { $in: chapter_id_arr } })
    let assignment = await Assignment.find({ chapter_id: { $in: chapter_id_arr } })
    let assignment_map = {}
    for (let i = 0; i < assignment.length; i++) {
      if (!assignment_map[assignment[i].chapter_id]) {
        assignment_map[assignment[i].chapter_id] = []
      }
      assignment_map[assignment[i].chapter_id].push(assignment)
    }

    for (let i = 0; i < chapter.length; i++) {
      chapter[i].content = []
      chapter[i].content.push(...assignment_map[chapter._id])
    }



    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
});

module.exports = router;