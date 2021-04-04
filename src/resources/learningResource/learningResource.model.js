import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Coding', 'Maths', 'Electronics'],
    required: true
  },
  minAge: {
    type: Number,
    required: true
  },
  maxAge: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  body: String,
  tags: {
    type: [String]
  }
});

export default mongoose.model('learningResource', learningResourceSchema);