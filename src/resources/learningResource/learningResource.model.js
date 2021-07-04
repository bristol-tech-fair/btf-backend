import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  title: {
    type: String
  },
  category: {
    type: String
  },
  ages: {
    type: String
  },
  rating: {
    type: Number
  },
  color: {
    type: String
  },
  to: {
    type: String,
    default: '/'
  },
  body: {
    type: String
  },
  tags: {
    type: [String]
  },
  description: {
    type: String
  },
  attachments: [
    {
      _id: String,
      resource_type: String,
      secure_url: String
    }
  ]
});

export default mongoose.model('learningResource', learningResourceSchema);
