module.exports = (array) => {
  //   // console.log(array)

  //   // for(let i = 0; i<=array.length; i+=1){
  //   //           console.log(array[i])
  //   // }
  // let arr=[];
  //   for (let i = 1; i <= Math.max.apply(null,array); i += 1) {
  //     y = array.indexOf(i)
  //     // console.log(y)

  //   }

  const { length } = array;
  const size = Math.sqrt(length);
  return array
    .map((num, i) => num && { num, i })
    .filter((a) => a !== 0)
    .sort((a, b) => a.num - b.num)
    .map(({ i }) => ({ x: i % size, y: size - Math.floor(i / size) - 1 }));
};
