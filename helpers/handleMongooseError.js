export const handleMongooseError = (error, data, next) => {
    error.status = status;
    next();
};