const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Contact = require('../models/Contact');

exports.getAllContacts = catchAsync(async (req, res, next) => {
  // Execute query.
  const features = new APIFeatures(Contact.find(), req.query)
    .filter()
    .sort('-createdAt')
    .limitFields()
    .paginate();
  const contacts = await features.query;

  // Send response.
  return res.status(200).json({
    success: true,
    status: 'success',
    results: contacts.length,
    message: { contacts }
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { numViewed: contact.numViewed + 1, lastViewed: Date.now() } },
    { new: true, upsert: true }
  );

  return res.status(200).json({
    success: true,
    status: 'success',
    message: { contact: updatedContact }
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  return res.status(201).json({
    success: true,
    status: 'success',
    message: { contact: newContact }
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }

  return res.status(200).json({
    success: true,
    status: 'success',
    message: { contact }
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return next(new AppError('No contact found with that ID', 404));
  }

  return res.status(200).json({
    success: true,
    status: 'success',
    message: { contact }
  });
});
