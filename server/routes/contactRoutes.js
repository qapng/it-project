const express = require('express');
const authController = require('../controllers/authController');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Protect access
router.use(authController.protect);

// @route POST/GET api/contact/
// @desc create contact or get all contacts
// @access Private
router
  .route('/')
  .post(contactController.createContact)
  .get(contactController.getAllContacts);

// @route GET/PATCH/DELETE api/contact/:id
// @desc get, update, or delete a contact
// @access Private
router
  .route('/:id')
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
