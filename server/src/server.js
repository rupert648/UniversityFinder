//requirements 
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//modules
const universityChooser = require('./api/universityChooser');
const addUniversity = require('./api/addUniversity');
const middlewares = require('./middlewares/middlewares');

require('dotenv').config();

//connect to database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Connected to database at:${process.env.DATABASE_URL}`);
});

//include requirements into app
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN //connects to REACT app
}));

//Routes
app.use('/uni-finder', universityChooser);
app.use('/add-new-university', addUniversity);

//called if routes are not completed
app.use(middlewares.notFound);  //404
app.use(middlewares.errorHandler);  //delivers error to client

//start server
const port = process.env.PORT || 6483;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});