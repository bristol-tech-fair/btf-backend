import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['event', 'article', 'Event', 'Article'],
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: [String],
  comments: {
    type: [
      {
        author: {
          type: String,
          required: true
        },
        body: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
          required: true
        }
      }
    ]
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

export default mongoose.model('Post', postSchema);
