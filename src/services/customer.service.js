const mongoose = require('mongoose');
const PolicyHolder = mongoose.model('PolicyHolder');

getCustomerPolicy = async (customerName) => {
  try {
    const customers = await PolicyHolder.find({
        Name: {
          $regex: '.*' + customerName + '.*'
        }
      })
      .sort({
        PolicyNumber: -1
      }) // get latest items
    return customers;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getCustomerPolicy
}