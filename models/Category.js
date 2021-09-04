const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  color: {
    type: String,
    required: true,
    validate(col) {
      return col.startsWith('#', 0) && col.length === 7;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('Categories', CategorySchema);
module.exports = Category;
