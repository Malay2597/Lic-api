const mongoose = require('mongoose');
const PolicyHolder = mongoose.model('PolicyHolder');

// Get policy list for specific page and size
getAllPolicyHolders = async (pageNumber = 1, pageSize) => {
  try{
  // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  const skip = (pageNumber - 1) * pageSize;
  const x = await PolicyHolder.find({})
    .sort({
      PolicyNumber: -1
    }) // get latest items
    .skip(skip)
    .limit(pageSize)
  return x;
 } catch(err) {
console.log('error' + err);
}
}

// Get policy count
getPolicyHoldersCount = async () => {
  try {
    const policyHoldersCount = await PolicyHolder.countDocuments({}).exec();
    return policyHoldersCount
  } catch (err) {
    console.log('error' + err);
  }
}

module.exports = {
  getAllPolicyHolders,
  getPolicyHoldersCount
}