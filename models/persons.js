const mongoose = require('mongoose');
const { personSchema } = require("./../schemas/persons");

var personsModel = mongoose.model('persons', personSchema);

module.exports = {
  personsModel,
}