import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  tags: {
    type: [String]
  }
});

export default mongoose.model('Podcast', podcastSchema);