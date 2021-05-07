const {
  getAllPolicyHolders,
  getPolicyHoldersCount
} = require('../services/policyHolder.service')

const init = app => {
  const ROUTE = '/policyHolders';

  app.get(`${ROUTE}/`, async ({
    query: {
      pageNumber,
      pageSize
    }
  }, res) => {
    try {
      const policyHolders = await getAllPolicyHolders(parseInt(pageNumber), parseInt(pageSize));
      const policyHoldersCount = await getPolicyHoldersCount();
      const response = {
        policyHoldersInfo: policyHolders,
        length: policyHoldersCount
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
