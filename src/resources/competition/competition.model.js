import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  deadline: Date,
  image_url: String
});

export default mongoose.model('Competition', competitionSchema);
