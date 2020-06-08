//This function is called if the request route fits none of our routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);    //NOT FOUND
    next(error);
};

/* eslint-disable no-unused-vars */
const errorHandler = (error, req, res, next) => {   //if any errors reach here
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '😉' : error.stack
    });
};
/* eslint-enable no-unused-vars */

module.exports = {
    notFound,
    errorHandler
};