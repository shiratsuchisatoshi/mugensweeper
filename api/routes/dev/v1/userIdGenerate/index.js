const router = require('express').Router();
const jwt = require('jsonwebtoken');
const generateToken = require('./generateToken.js');
const createDate = require('../dateGenerate/dateGenerate.js');
const { addUser,getUser }  = require('../../../../../api/models/v1/userStore.js');


router.route('/').post(async(req, res) => {
  const arr = {};
  const accessToken = generateToken.generate();
  const { userID } = jwt.decode(accessToken);
  // ここはreq.body.userNameで取得する想定
  // const { userName } = req.body.userName;
  const  userName  = 'shir＿'

  // 正規表現でuserNameの要件をチェック
  // 3文字以上7文字以下であればtrueを返す（文字種は問わず）
  const reg = /^.{3,7}$/;

  if (reg.test(userName) && userName !== null && userName !== undefined) {
    arr.userID = userID;
    arr.userName = userName;
    arr.createDate = createDate.value;
    await addUser(arr);

  } else {
    arr.userID = null;
    arr.userName = null;
    arr.createDate = createDate.value;
    await addUser(arr);
  }

  res.json(await getUser());
});

module.exports = router;
