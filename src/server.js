import express from 'express';
import mongoose from 'mongoose';
<<<<<<< HEAD
import resourceRoutes from './resources';
=======
>>>>>>> 387abd7360c6c2b7cab78c86d08cc65b0f5a6ead
import fileParser from './middleware/fileParser';
import jsonParser from './middleware/jsonParser';
import cloudinary from 'cloudinary';
import cloudinaryLoader from './loaders/cloudinaryLoader';
import postRouter from './resources/post/post.router';
import groupRouter from './resources/group/group.router';
import competitionRouter from './resources/competition/competition.router';
import learningResourceRouter from './resources/learningResource/learningResource.router';

const app = express();

// set PORT value from environment variables or default 3000
const PORT = process.env.PORT || 3000;

// setup the database
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log(`Connected to database`));

// setup cloudinary
cloudinaryLoader(cloudinary);

// middleware
app.use(express.json());
app.use(fileParser);
app.use(jsonParser);

// routes
app.use('/api', resourceRoutes);

// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
