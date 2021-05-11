import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
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
  }
});

export default mongoose.model('club', clubSchema);
