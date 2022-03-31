const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A contact must have name'],
      trim: true,
      maxlength: [255, 'A name must have less than or equal to 255 characters'],
      validate: [validator.isAscii, 'Name must only contain ASCII characters']
    },
    email: {
      type: String,
      trim: true,
      maxlength: [
        255,
        'An email must have less than or equal to 255 characters'
      ],
      validate: {
        validator: function (val) {
          return validator.isEmail(val) || val === '';
        },
        message: 'Invalid email'
      }
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: [
        255,
        'A phone no. must have less than or equal to 255 characters'
      ],
      validate: {
        validator: function (val) {
          return val.match(/^[0-9\-+]+$/) || val === '';
        },
        message: 'A phone no. must only contain numbers, +, and -'
      }
    },
    relationship: {
      type: String,
      trim: true,
      maxlength: [255, 'A job must have less than or equal to 255 characters']
    },
    metAt: {
      type: String,
      trim: true,
      maxlength: [
        255,
        'A company must have less than or equal to 255 characters'
      ]
    },
    notes: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      default: '#FFFFFF'
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'users',
    //   required: [true, 'A contact must have an owner']
    // },
    numViewed: {
      type: Number,
      default: 0,
      min: 0
    },
    lastViewed: {
      type: Date,
      default: Date.now,
      validate: [validator.isDate, 'Invalid date ({VALUE})']
    }
  },
  { timestamps: true }
);

const Contact = mongoose.model('contacts', ContactSchema);

module.exports = Contact;
