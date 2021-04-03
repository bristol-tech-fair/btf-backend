import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default mongoose.model('group', groupSchema);
