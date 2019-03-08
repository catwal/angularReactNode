module.exports = {
  normelizeErrors: function(errors) {
    let nomelizeErrors = [];
    // iterate object into javascript
    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
       // console.log(property, errors[property]);
        nomelizeErrors.push({title: property, detail: errors[property].message})
      }
    }
    return nomelizeErrors;
  }
};
