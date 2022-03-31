const Category = require('../models/Category');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res, next) => {
  // Execute query
  const features = new APIFeatures(Category.find(), req.query)
    .filter()
    .sort('name')
    .limitFields()
    .paginate();
  const categories = await features.query;

  return res.status(200).json({
    success: true,
    status: 'success',
    results: categories.length,
    message: { categories }
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('There is no category with that ID', 404));
  }

  return res.status(200).json({
    success: true,
    status: 'success',
    message: { category }
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  return res.status(201).json({
    success: true,
    status: 'success',
    message: { category: newCategory }
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    return next(new AppError('There is no category with that ID', 404));
  }

  return res.status(200).json({
    success: true,
    status: 'success',
    message: { category }
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('There is no category with that ID', 404));
  }

  return res.status(200).json({
    success: true,
    status: 'success',
    message: { category }
  });
});
