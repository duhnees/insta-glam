import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).send(err.message || 'Server error!');
};