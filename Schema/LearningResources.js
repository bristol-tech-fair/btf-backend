import mongoose from 'mongoose';
const { Schema } = mongoose;

const learningResources = new Schema({
    category: {
        coding: String,
        maths: String,
        electronics:  String
    },
    ages: [Number],
    title:  String,
    rating: { type: Number, min: 0, max: 5 },
    body: String,
    tags: [String]
});