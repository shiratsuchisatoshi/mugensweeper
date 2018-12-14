const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({ users: String, x: Number, y: Number });
module.exports = mongoose.model('FieldModel', schema);
