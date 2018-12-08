// const router = require('express').Router();

// let arr = [{ x: 0, y: 0 }];

// router.route('/').post((req, res) => {
//   const x = +req.body.x;
//   const y = +req.body.y;
//   arr.push({ x, y });
//   res.json(arr);
// });

// router.route('/').delete((req, res) => {
//   arr = [{ x: 0, y: 0 }];
//   res.json(arr);
// });

// module.exports = router;

const router = require('express').Router();

const field = [{ x: 0, y: 0 }];

// router.route('/').post((req, res) => {
//   // 開いた場所の周囲
//   const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

//   if (req.body.x) {
//     for (let i = 0; i < field.length; i += 1) {
//       for (let t = 0; t < directions.length; t += 1) {
//         const a = directions[t][0];
//         const b = directions[t][1];
//         const u = field[i].x + a; // 隣接するy座標
//         const k = field[i].y + b; // 隣接するx座標

//         if (field[i].x === Number(req.body.x) && field[i].y === Number(req.body.y)) {
//           break;
//         } else if (
//           i === field.length - 1 &&
//           (u === Number(req.body.x) && k === Number(req.body.y))
//         ) {
//           field.push({ x: Number(req.body.x), y: Number(req.body.y) });
//         }
//       }
//     }
//   }
//   res.json(field);
// });

router.route('/').post((req, res) => {
  // 開いた場所の周囲

  const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

  if (req.body.x) {
    for (let i = 0; i < field.length; i += 1) {
      for (let t = 0; t < directions.length; t += 1) {
        const a = directions[t][0];
        const b = directions[t][1];
        const u = field[i].x + a; // 隣接するy座標
        const k = field[i].y + b; // 隣接するx座標

        if (field[i].x === Number(req.body.x) && field[i].y === Number(req.body.y)) {
          break;
        } else if (
          i === field.length - 1 &&
          (u === Number(req.body.x) && k === Number(req.body.y))
        ) {
          field.push({ x: Number(req.body.x), y: Number(req.body.y) });
        }
      }
    }
  }
  res.json(field);
});

router.route('/').delete((req, res) => {
  field.length = 1;
  res.json(field);
});

module.exports = router;
