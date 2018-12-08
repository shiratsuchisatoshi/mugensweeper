// const chai = require('chai');
// const app = require('../../../../routes/app.js');

// const initialBlock = () => ({
//   x: 0,
//   y: 0,
// });

// describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
//   it('座標をリセットできる。', async () => {
//     // Given
//     const positions = [
//       {
//         x: 1,
//         y: 2,
//       },
//       {
//         x: 3,
//         y: -1,
//       },
//     ];

//     // When
//     let lastBody;
//     for (let i = 0; i < positions.length; i += 1) {
//       const { body } = await chai // eslint-disable-line
//         .request(app)
//         .post('/dev/shiratsuchi/block')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(positions[i]);
//       lastBody = body;
//     }
//     const { body } = await chai.request(app).delete('/dev/shiratsuchi/block');

//     // Then
//     expect(lastBody).toHaveLength(positions.length + 1);
//     expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
//     expect(body).toEqual(expect.arrayContaining([initialBlock()]));
//   });

//   it('ランダムに複数Postした座標が返り値に追加される', async () => {
//     // 前のテストのBlockをサーバーから消しておく
//     await chai.request(app).delete('/dev/sihratsuchi/block');

//     // Given
//     const positions = [];
//     const count = Math.floor(5 * Math.random()) + 5;
//     let cnt = 0;
//     while (cnt < count) {
//       const tmp = {
//         x: Math.floor(10000 * Math.random()),
//         y: Math.floor(10000 * Math.random()),
//       };

//       if (positions.indexOf(tmp) === -1) {
//         positions.push(tmp);
//         cnt += 1;
//       }
//     }

//     // When
//     let lastBody;
//     for (let i = 0; i < positions.length; i += 1) {
//       const { body } = await chai // eslint-disable-line
//         .request(app)
//         .post('/dev/shiratsuchi/block')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(positions[i]);
//       lastBody = body;
//     }

//     // Then
//     expect(lastBody).toHaveLength(count + 1);
//     expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
//   });

//   it('同じ座標にはpostしても登録されない', async () => {
//     // 前のテストのBlockをサーバーから消しておく
//     await chai.request(app).delete('/dev/shiratsuchi/block');

//     // 1: Given
//     const positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];

//     // 2: When
//     let lastBody;
//     for (let i = 0; i < positions.length; i += 1) {
//       const { body } = await chai
//         .request(app)
//         .post('/dev/shiratsuchi/block')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(positions[i]);
//       lastBody = body;
//     }

//     // 3: Then
//     // 重複削除
//     const positions2 = positions.filter(
//       (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
//     );

//     expect(lastBody).toHaveLength(positions2.length + 1);
//     expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));
//   });

//   it('周囲の八方向のみ開ける', async () => {
//     // 前のテストのBlockをサーバーから消しておく
//     await chai.request(app).delete('/dev/shiratsuchi/block');

//     // 1: Given
//     const positions = [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 4, y: 4 }];

//     // 2: When
//     let lastBody;
//     for (let i = 0; i < positions.length; i += 1) {
//       const { body } = await chai
//         .request(app)
//         .post('/dev/shiratsuchi/block')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(positions[i]);
//       lastBody = body;
//     }

//     // 3: Then
//     // 開いている場所の周囲八方向のみ登録
//     const matchers = [{ x: 0, y: 1 }, { x: 0, y: 2 }];

//     expect(lastBody).toHaveLength(matchers.length + 1);
//     expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
//   });
// });

const chai = require('chai');
const app = require('../../../../routes/app.js');
const array2Positions = require('./utils/array2Positions.js');

const initialBlock = () => ({ x: 0, y: 0 });

describe('前のゲーム情報のリセット処理、および、リクエスト返り値の追加テスト', () => {
  it('座標をリセットできる。', async () => {
    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: 2, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/shiratsuchi/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }
    const { body } = await chai.request(app).delete('/dev/shiratsuchi/block');

    // 3: Then
    expect(lastBody).toHaveLength(positions.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions]));
    expect(body).toEqual(expect.arrayContaining([initialBlock()]));
  });

  it('同じ座標にはpostしても登録されない', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/shiratsuchi/block');

    // 1: Given
    const positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/shiratsuchi/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    // 3: Then
    // 重複削除
    const positions2 = positions.filter(
      (v1, i1, a1) => a1.findIndex((v2) => v1.x === v2.x && v1.y === v2.y) === i1,
    );

    expect(lastBody).toHaveLength(positions2.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...positions2]));
  });

  it('周囲の八方向のみ開ける', async () => {
    // 前のテストのBlockをサーバーから消しておく
    await chai.request(app).delete('/dev/shiratsuchi/block');

    // 1: Given
    // const positions = [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 4, y: 4 }];

    // prettier-ignore
    const positions = array2Positions([
      0,0,0,0,3,
      0,0,0,0,0,
      2,0,0,0,0,
      1,0,0,0,0,
      0,0,0,0,0,
    ]);

    // // 2: When
    // let lastBody;
    // for (let i = 1; i < Math.max.apply(null,positions); i += 1) {
    //   let y =positions.lastIndexOf(i)/5;
    //   const { body } = await chai
    //     .request(app)
    //     .post('/dev/shiratsuchi/block')
    //     .set('content-type', 'application/x-www-form-urlencoded')
    //     .send({x:1,y:y});
    //   lastBody = body;
    // }

    // 2: When
    let lastBody;
    for (let i = 0; i < positions.length; i += 1) {
      const { body } = await chai
        .request(app)
        .post('/dev/shiratsuchi/block')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(positions[i]);
      lastBody = body;
    }

    // 3: Then
    // 開いている場所の周囲八方向のみ登録
    const matchers = [{ x: 0, y: 1 }, { x: 0, y: 2 }];

    expect(lastBody).toHaveLength(matchers.length + 1);
    expect(lastBody).toEqual(expect.arrayContaining([initialBlock(), ...matchers]));
  });
});
