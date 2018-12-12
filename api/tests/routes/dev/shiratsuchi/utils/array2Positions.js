module.exports = (array) => {
  const maxNumber = Math.max.apply(null, array);
  const size = Math.sqrt(array.length);
  const returnArray = [];

  for (let i = 1; i <= maxNumber; i += 1) {
    const x = array.indexOf(i) % size;
    const y = size - Math.floor(array.indexOf(i) / size) - 1;
    returnArray.push({ x, y });
  }

  return returnArray;
  // const {length}  = array;
  // const size = Math.sqrt(length);

  // return array
  //   .map((num, i) => num && { num, i })
  //   .filter((a) => a !== 0)
  //   .sort((a, b) => a.num - b.num)
  //   .map(({ i }) => ({ x: i % size, y: size - Math.floor(i / size) - 1 }));
};
