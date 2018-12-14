const FieldModel = require('./fieldModel.js');

const propFilter = '-_id -__v';

module.exports = {
  async initField() {
    await FieldModel.deleteMany();

    await new FieldModel({ x: 0, y: 0 }).save();
  },
  getField() {
    return FieldModel.find({}, propFilter).lean();
  },
  addBlock(block) {
    return new FieldModel(block).save();
  },
  addUsers(user) {
    return new FieldModel(user).save();
  },
};
