module.exports = {
  initSet(bomCount) {
    const arr = [];
    const bomPosition = [];
    const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

    while (bomPosition.length < bomCount) {
      const num = Math.floor(Math.random() * directions.length);

      if (bomPosition.indexOf(num) < 0) {
        bomPosition.push(num);
      }
    }

    // directions.map((value, index) => {
    //   const id = bomPosition.indexOf(index);
    //   const a = directions[index][0];
    //   const b = directions[index][1];

    //   if (id >= 0) {
    //     arr.push({ x: b, y: a, bom: true });
    //   } else {
    //     arr.push({ x: b, y: a, bom: false });
    //   }
    // });

    return arr;
  },
};
