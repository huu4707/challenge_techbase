import 'jest-extended';
import { SetupRequest } from '../../src/utils/testing';
const callAPI = new SetupRequest().request;
import faker from 'faker';
const randomEmail = faker.internet.email();

beforeAll(async () => {
  // This hook excutes before run test cases
});

jest.setTimeout(50000);

describe('Register', () => {
  const expectedFailedResult = {
    errors: expect.toBeArray()
  };
  const expectedSuccessResult = {
    data: expect.toBeObject(),
    meta: expect.toBeNil() || expect.toBeObject()
  };
  // Missing Email should be fail
  test('Missing email must be fail', async () => {
    const data = {
      name: 'test',
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  //Invalid Email
  test('Email invalid format should be fail', async () => {
    const data = {
      email: 'invalidEmail',
      name: 'test',
      password: 'MyPass123!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // //Missing name
  test('Missing name should be fail', async () => {
    const data = {
      email: randomEmail,
      password: 'MyPass123!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // // Missing password should be fail
  test('Missing password should be fail', async () => {
    const data = {
      email: 'somgthing@gmail.com',
      name: 'MrA'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // // Password invalid format
  test('Missing password should be fail', async () => {
    const data = {
      email: 'somgthing@gmail.com',
      name: 'MrA',
      password: '123'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // // Succesful case
  test('Succesful case', async () => {
    const data = {
      email: randomEmail,
      name: 'MrA',
      password: 'MyPass123!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedSuccessResult);
  });
});

// describe('Login', () => {
//   const expectedFailedResult = {
//     errors: expect.toBeArray()
//   };
//   const expectedSuccessResult = {
//     data: expect.toBeObject(),
//     meta: expect.toBeNil() || expect.toBeObject()
//   };
//   // Missing Email should be fail
//   test('Missing email must be fail', async () => {
//     const data = {
//       email: 'nguyentienhuu47@gmail.com',
//       password: '123456Aa!'
//     };
//     const result = await callAPI({ method: 'post', url: '/user/login', data });
//     console.log('result', result);
//     expect(result.response).toMatchObject(expectedFailedResult);
//   });

//   // //Invalid Email
//   // test('Email invalid format should be fail', async () => {
//   //   const data = {
//   //     email: 'invalidEmail',
//   //     name: 'test',
//   //     password: 'MyPass123!'
//   //   };
//   //   const result = await callAPI({ method: 'post', url: '/user/register', data });
//   //   expect(result.response).toMatchObject(expectedFailedResult);
//   // });

//   // // //Missing name
//   // test('Missing name should be fail', async () => {
//   //   const data = {
//   //     email: randomEmail,
//   //     password: 'MyPass123!'
//   //   };
//   //   const result = await callAPI({ method: 'post', url: '/user/register', data });
//   //   expect(result.response).toMatchObject(expectedFailedResult);
//   // });

//   // // // Missing password should be fail
//   // test('Missing password should be fail', async () => {
//   //   const data = {
//   //     email: 'somgthing@gmail.com',
//   //     name: 'MrA'
//   //   };
//   //   const result = await callAPI({ method: 'post', url: '/user/register', data });
//   //   expect(result.response).toMatchObject(expectedFailedResult);
//   // });

//   // // // Password invalid format
//   // test('Missing password should be fail', async () => {
//   //   const data = {
//   //     email: 'somgthing@gmail.com',
//   //     name: 'MrA',
//   //     password: '123'
//   //   };
//   //   const result = await callAPI({ method: 'post', url: '/user/register', data });
//   //   expect(result.response).toMatchObject(expectedFailedResult);
//   // });

//   // // // Succesful case
//   // test('Succesful case', async () => {
//   //   const data = {
//   //     email: randomEmail,
//   //     name: 'MrA',
//   //     password: 'MyPass123!'
//   //   };
//   //   const result = await callAPI({ method: 'post', url: '/user/register', data });
//   //   expect(result.response).toMatchObject(expectedSuccessResult);
//   // });
// });
