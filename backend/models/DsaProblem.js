const mongoose = require('mongoose');

const dsaProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DsaProblem', dsaProblemSchema);