import 'jest-extended';
import { SetupRequest } from '../../src/utils/testing';
import { UserModel } from '../../src/repositories/models';
const callAPI = new SetupRequest().request;
import faker from 'faker';
const randomEmail = faker.internet.email();

beforeAll(async () => {
  // This hook excutes before run test cases
  await UserModel.destroy({ where: {}, truncate: true });
  const data = {
    email: 'nguyenvana@gmail.com',
    name: 'Nguyen Van A',
    password: '123456Aa!'
  };
  await callAPI({ method: 'post', url: '/user/register', data });
});

jest.setTimeout(50000);

xdescribe('Register', () => {
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
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // //Missing name
  test('Missing name should be fail', async () => {
    const data = {
      email: randomEmail,
      password: '123456Aa!'
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

  //Email already exists should be fail
  test('Email already existsl must be fail', async () => {
    const data = {
      name: 'test',
      email: 'nguyenvana@gmail.com',
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });
  // // Successful case
  test('Successful case', async () => {
    const data = {
      email: randomEmail,
      name: 'MrA',
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/register', data });
    expect(result.response).toMatchObject(expectedSuccessResult);
  });
});

describe('Login', () => {
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
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // //Invalid Email
  test('Email invalid format should be fail', async () => {
    const data = {
      email: 'invalidEmail',
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // // // Missing password should be fail
  test('Missing password should be fail', async () => {
    const data = {
      email: 'somgthing@gmail.com'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // // // Password invalid format
  test('Missing password should be fail', async () => {
    const data = {
      email: 'somgthing@gmail.com',
      password: '123'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  //Email not found
  test('Email not found', async () => {
    const data = {
      email: 'somgthing@gmail.com',
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  //Password wrong
  test('Password wrong', async () => {
    const data = {
      email: 'nguyenvana@gmail.com',
      password: '123456Aa!a'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // // Successful case
  test('Successful case', async () => {
    const data = {
      email: 'nguyenvana@gmail.com',
      password: '123456Aa!'
    };
    const result = await callAPI({ method: 'post', url: '/user/login', data });
    expect(result.response).toMatchObject(expectedSuccessResult);
  });
});
