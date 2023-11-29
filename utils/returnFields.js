const filterValues = (value, fields) => {
  let returnValue = {};
  fields.map(field => {
    returnValue[field] = value[field]
  })
  return returnValue;
}

const returnFields = {
  selectFields(obj, fields) {
    if (obj.length > 0 ) {
      obj = obj.map(value => {
        return value = filterValues(value, fields);
      });
    } else {
      obj = filterValues (obj, fields);
    }
    return obj;
  }
};

module.exports = {
  returnFields,
}