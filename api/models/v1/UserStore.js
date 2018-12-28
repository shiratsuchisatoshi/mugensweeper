const UserModel = require('./UserModel.js');

const propFilter = '-_id -__v';
// const userArray = [];

module.exports = {
  addUser(user) {
    console.log(user);
    return UserModel(user).save();
  },
  getUser(userId) {
    console.log(userId);
    return UserModel.find({ userName }, propFilter).lean();
  },
  // async addUser(user) {
  //   console.log(user);
  //   // userArray.push(user);
  //   await new UserModel(user).save();
  // },
  getUserIds() {
    return UserModel.find({}, { userId: 1 }, propFilter).lean();
  },

  // getUserIds(user) {
  //   if (user.userId) {
  //     return userArray.find((value) => value.userId === user.userId);
  //   }
  //   return null;
  // },
};
