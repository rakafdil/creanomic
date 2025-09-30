const { AppError } = require('../utils/AppError.js');
const { catchAsyncError } = require('../utils/catchAsyncError.js');

const deleteOne = (model, name) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        const document = await model.findByIdAndDelete(id, {
            new: true,
        });

        let response = {};
        response[name] = document;

        if (document) {
            return res.status(201).json({ message: "success", ...response });
        }

        next(new AppError(`${name} was not found`, 404));
    });
};

module.exports = { deleteOne };