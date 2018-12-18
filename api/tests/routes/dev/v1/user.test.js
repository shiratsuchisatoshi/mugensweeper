const chai = require('chai');
const app = require('../../../../routes/app.js');
const { connectDB, disconnectDB, dropDB } = require('../../../../database.js');
const generateToken = require('../../../../routes/dev/v1/userIdGenerate/generateToken.js');
const createDate = require('../../../../routes/dev/v1/dateGenerate/dateGenerate.js');
const jwt = require('jsonwebtoken');
const { addUser,getUser }   = require('../../../../../api/models/v1/userStore.js');


describe('DB接続についてのテスト', () => {
  beforeAll(connectDB);
  afterEach(dropDB);
  afterAll(disconnectDB);

  it('ＤＢ接続テスト', async () => {
    // Given
    const testUser =[ { userName:'shiratsuchi' }];

    // When
    const { body } = await chai.request(app).get('/dev/v1/user');
    const testDB = await getUser();

    // Then
    expect(body).toMatchObject(testUser);
    expect(testDB).toEqual(expect.arrayContaining([...testUser]));
  });

  it('userId発行テスト', async () => {
    // Given
    const testjwt = generateToken.generate();
    const testId = jwt.decode(testjwt).userId;
    const testName = 'shiratsuchi';
    const testDate = createDate.value;

    await addUser({
      userId: testId,
      userName: testName,
      createDate: testDate
    });

    // When
    const testDB = await getUser();

    // Then
    expect(testDB[0].userId).toEqual(testId);
    expect(testDB[0].userName).toEqual(testName);
    expect(testDB[0].createDate).toEqual(testDate);
  });

  it('userId,userName.createDateがDBに登録できるか', async () => {
    // Given
    const testUser = [ { userName:'shir＿' }];

    // When
    const { body } = await chai.request(app).post('/dev/v1/userIdGenerate/index');
    const testDB = await getUser();

    // Then
    expect(body).toMatchObject(testUser);
    expect(body).toEqual(expect.arrayContaining([...testDB]));
  });
});
