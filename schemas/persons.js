var uuid = require('uuid/v1');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema =  new Schema({
  _id: { type: String, default: uuid },
  name: { type: String, required: true },
  document: { type: String, required: true },
  birthdate: { type: String, required: true },
  createdAt:{ type: String, required: true },
  updatedAt:{ type: String },
  deletedAt:{ type: String },
},{ _id: false });

module.exports = {
  personSchema,
}