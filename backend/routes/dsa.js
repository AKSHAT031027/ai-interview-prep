const express = require('express');
const DsaProblem = require('../models/DsaProblem');
const Progress = require('../models/Progress');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET all problems with this user's solved status
router.get('/', authMiddleware, async (req, res) => {
  try {
    const problems = await DsaProblem.find();

    const progressRecords = await Progress.find({ user: req.user.id });

    const problemsWithStatus = problems.map((problem) => {
      const progress = progressRecords.find(
        (p) => p.problem.toString() === problem._id.toString()
      );
      return {
        ...problem._doc,
        solved: progress ? progress.solved : false
      };
    });

    res.status(200).json(problemsWithStatus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST toggle solved status for a problem
router.post('/toggle/:problemId', authMiddleware, async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    let progress = await Progress.findOne({ user: userId, problem: problemId });

    if (progress) {
      progress.solved = !progress.solved;
      await progress.save();
    } else {
      progress = new Progress({ user: userId, problem: problemId, solved: true });
      await progress.save();
    }

    res.status(200).json({ message: 'Progress updated', solved: progress.solved });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST add a new problem (admin use, no auth check for now — we'll secure this later)
router.post('/add', async (req, res) => {
  try {
    const { title, topic, difficulty, link } = req.body;
    const newProblem = new DsaProblem({ title, topic, difficulty, link });
    await newProblem.save();
    res.status(201).json({ message: 'Problem added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
