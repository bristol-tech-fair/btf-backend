import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      eventImg: {
        type: String,
        required: true
      },
      eventDate: { 
        type: Date,
        required : true,
        validate: {
          validator: function(input) {
            return new Date(input) >= new Date()? true:false;
          },
          message: input => `${input} must be greater than or equal to the current date!`
        }
      },
      body:String,
      facebbok: String,
      linkdin: String,
      twitter: String,
      bookmrk : String
    } 
)

eventSchema.index({ title: 1, eventDate: 1 }, { unique: true })

export const Event = mongoose.model('event', eventSchema)