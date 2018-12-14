const router = require('express').Router();
const { getField } = require('../../../models/dev/shiratsuchi/fieidstore.js');

router.route('/').get(async (req, res) => {
  res.json(await getField());
});

module.exports = router;
