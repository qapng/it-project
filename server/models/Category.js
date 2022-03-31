const mongoose = require('mongoose');
const validator = require('validator');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'A category must have a name'],
      maxlength: [255, 'A name must have less than or equal to 255 characters'],
      validate: [validator.isAscii, 'Name must only contain ASCII characters']
    },
    color: {
      type: String,
      default: '#000000',
      validate: [validator.isHexColor, 'Invalid hex colour ({VALUE})']
    }
  },
  { timestamps: true }
);

const Category = mongoose.model('Categories', CategorySchema);

module.exports = Category;
