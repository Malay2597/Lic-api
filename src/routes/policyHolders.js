const mongoose = require('mongoose');
const PolicyHolder = mongoose.model('PolicyHolder');

// get users for specific page and size
getAll = (pageNumber = 1, pageSize) => {
  // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  const skip = (pageNumber - 1) * pageSize;
  return PolicyHolder.find({})
    .sort({
      _id: -1
    }) // get latest items
    .skip(skip)
    .limit(pageSize)
}

// get user count
getUserCount = async () => {
  try {

    const userCount = await PolicyHolder.countDocuments({}).exec();
    return userCount
  } catch (err) {
    console.log('error' + err);
  }
}

const init = app => {
  const ROUTE = '/policyHolders';

  app.get(`${ROUTE}/`, async (req, res) => {
    try {
      const pageIndex = parseInt(req.query.pageNumber);
      const pageSize = parseInt(req.query.pageSize);
      const users = await getAll(pageIndex, pageSize);
      // console.log(users);
      const userCount = await getUserCount();
      console.log(userCount);
      const response = {
        userInfo: users,
        length: userCount
      }
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err)
    }
  });
};

module.exports = {
  init
};
