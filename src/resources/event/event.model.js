import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  date: { 
    type: Date,
    required : true,
    validate: {
      validator: function(input) {
        return new Date(input) >= new Date()? true:false;
      },
      message: input => `${input} must be greater than or equal to the current date!`
    }
  },
  body:String
});

export default mongoose.model('event', eventSchema);
