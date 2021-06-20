import mongoose from 'mongoose';

const learningResourceSchema = new mongoose.Schema({
  category: {
    type: String,
    // enum: ['Coding', 'Maths', 'Electronics', 'Design', 'Robotics'],
    // required: true
  },
  ages: {
    type: String,
    // required: true
  },
  title: {
    type: String,
    // required: true,
    // unique: true
  },
  // rating: {
  //   type: Number,
  //   min: 0,
  //   max: 5,
    // required: true
  // },
  // body: String,
  // tags: {
    // type: [String]
  // },
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
