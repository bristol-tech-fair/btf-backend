import mongoose from 'mongoose';
const { Schema } = mongoose;

const learningResources = new Schema({
    category: {
        type: String, enum: ['coding', ' maths', 'electronics']
    },
    ages: [Number],
    title:  String,
    rating: { type: Number, min: 0, max: 5 },
    body: String,
    tags: [String]
});
