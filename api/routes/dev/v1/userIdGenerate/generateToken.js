const jwt = require('jsonwebtoken');
const getHash = require('random-hash');

function genHash() {
  let tempHash = '';
  let flag = 0;
  while (flag === 0) {
    tempHash = getHash.generateHash({ length: 8 });
    if (tempHash.indexOf('-') === -1 && tempHash.indexOf('_') === -1) {
      flag = 1;
    }
  }
  return tempHash;
}

exports.generate = function generateToken() {
  const userID = genHash();
  const token = jwt.sign(
    {
      userID,
    },
    'secret',
    {
      algorithm: 'HS256',
      noTimestamp: true,
    },
  );
  return token;
};
