const { getCustomerPolicy } = require('../services/customer.service');

const init = app => {
  const ROUTE = '/customer';

  app.get(`${ROUTE}/`, async ({ query : { customerName }}, res) => {
    try {
      const customers = await getCustomerPolicy(customerName);
      return res.status(200).json(customers);
    } catch (err) {
      return res.status(500).json(err)
    }
  });
};

module.exports = {
  init
};
