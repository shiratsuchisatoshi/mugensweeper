const router = require('express').Router();
const { addUser,getUser } = require('../../../models/v1/userStore.js');

router.route('/').get(async(req, res) => {
  const user = { userName: 'shiratsuchi'};
    await addUser(user);
  res.json(await getUser());
});

module.exports = router;
