import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  groupUrl: {
    type: String,
    required: true
  }
});

export default mongoose.model('group', groupSchema);
