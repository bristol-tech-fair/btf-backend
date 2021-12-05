import config from '../config';
import express from 'express';
import mongoose from 'mongoose';
import resourceRoutes from './resources';
import fileParser from './middleware/fileParser';

const app = express();

// setup the database
mongoose.connect(config.databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log(`Connected to database`));

// middleware
app.use(express.json());
app.use(fileParser);

// routes
app.use('/api', resourceRoutes);

// start the server
app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
