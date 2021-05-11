import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true  
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

export default mongoose.model('book', bookSchema);

