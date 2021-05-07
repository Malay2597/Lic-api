const mongoose = require('mongoose');
const PolicyHolder = mongoose.model('PolicyHolder');

getDueList = async (month) => {
  try {
    const policyHolders = await PolicyHolder.find({DueMonth:month})
      .sort({
        PolicyNumber: -1
      }) // get latest items
    return policyHolders;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getDueList }