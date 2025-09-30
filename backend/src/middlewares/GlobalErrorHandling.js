const globalErrorHandling = (err, req, res, next) => {
    let error = err.message;
    let code = err.statuscode || 500;

    if (process.env.MODE === "dev") {
        res.status(code).json({
            error,
            stack: err.stack,
        });
    } else {
        res.status(code).json({ error });
    }
};

export { globalErrorHandling };