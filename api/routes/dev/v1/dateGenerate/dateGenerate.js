require('date-utils');

const createDate = new Date().toFormat("YYYY-MM-DD HH24:MI:SS");

exports.value = createDate;

