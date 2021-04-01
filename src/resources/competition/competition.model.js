import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default mongoose.model('Competition', competitionSchema);
