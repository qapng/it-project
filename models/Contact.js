const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  company: {
    type: String,
  },
  category: {
    type: Array,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  last_viewed: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('contacts', ContactSchema);
module.exports = Contact;
