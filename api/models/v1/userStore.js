const UserModel = require('./userModel.js');
const propFilter = '-_id -__v';
// const users = [];

module.exports = {
   addUser(user) {
    return  new UserModel(user).save();
  },
   getUser() {
    return UserModel.find({},propFilter).lean();
  },
  // async deleteAllUserData() {
  //   users.length = 0;
  //   const User = new UserModel();

  //   await User.remove();
  // },
  // initUserData(userMongo) {
  //   userMongo.forEach((elm) => {
  //     users.push(elm);
  //   });
  //   return true;
  // },
  // // getUserData() {
  // getUserData(user) {
  //   if (user === undefined) { return users; }
  //   if (user.userId) { return users.find(u => u.userId === user.userId); }
  //   if (user.userName) { return users.find(u => u.userName === user.userName); }
  //   if (user.accessToken) { return users.find(u => u.accessToken === user.accessToken); }
  //   return null;
  //   // return users;
  // },
};
