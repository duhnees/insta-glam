import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).send(err.message || 'Server error!');
};