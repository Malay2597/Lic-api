const { getDueList } = require('../services/dueList.service');

const init = app => {
  const ROUTE = '/due-list';

  app.get(`${ROUTE}/`, async ({ query : { month }}, res) => {
    try {
      const dueList = await getDueList(month);
      return res.status(200).json(dueList);
    } catch (err) {
      return res.status(500).json(err)
    }
  });
};

module.exports = {
  init
};
