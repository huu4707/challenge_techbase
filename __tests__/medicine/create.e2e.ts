import 'jest-extended';
import { SetupRequest, IHeaders } from '../../src/utils/testing';
import { MedicineModel, UserModel } from '../../src/repositories/models';
const callAPI = new SetupRequest().request;
import faker from 'faker';

let token: string;
let medicineId: number;
beforeAll(async () => {
  // This hook excutes before run test cases
  await MedicineModel.destroy({ where: {}, truncate: true });
  await UserModel.destroy({ where: {}, truncate: true });
  const dataRegister = {
    email: 'nguyenvana@gmail.com',
    name: 'Nguyen Van A',
    password: '123456Aa!'
  };
  await callAPI({ method: 'post', url: '/user/register', data: dataRegister });

  const dataLogin = {
    email: 'nguyenvana@gmail.com',
    password: '123456Aa!'
  };
  const login = await callAPI({ method: 'post', url: '/user/login', data: dataLogin });
  token = login.response.data.token;

  const dataMedicine = { name: 'thuoc A', price: 20000 };
  const medicine = await MedicineModel.create(dataMedicine);
  medicineId = medicine.id;
  const dataMedicine2 = { name: 'thuoc B', price: 20000 };
  await MedicineModel.create(dataMedicine2);
});

jest.setTimeout(50000);

describe('Create medicine', () => {
  const expectedFailedResult = {
    errors: expect.toBeArray()
  };
  const expectedSuccessResult = {
    data: expect.toBeObject(),
    meta: expect.toBeNil()
  };
  // Missing token
  test('Missing token must be fail', async () => {
    const data = {
      name: faker.name.findName(),
      price: 20000
    };
    const result = await callAPI({ method: 'post', url: `/medicine/create`, data });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // Missing name
  test('Missing name must be fail', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const data = {
      price: 20000
    };
    const result = await callAPI({ method: 'post', url: `/medicine/create`, data, headers });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // Missing price
  test('Missing price must be fail', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const data = {
      name: faker.name.findName()
    };
    const result = await callAPI({ method: 'post', url: `/medicine/create`, data, headers });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // price < 0
  test('price < 0 must be fail', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const data = {
      name: faker.name.findName(),
      price: -1000
    };
    const result = await callAPI({ method: 'post', url: `/medicine/create`, data, headers });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // Name already exists
  test('Missing price must be fail', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const data = {
      name: 'thuoc A',
      price: 20000
    };
    const result = await callAPI({ method: 'post', url: `/medicine/create`, data, headers });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  //   // // Successful case
  test('Successful case', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const data = {
      name: faker.name.findName(),
      price: 100000
    };
    const result = await callAPI({ method: 'post', url: `/medicine/create`, data, headers });
    expect(result.response).toMatchObject(expectedSuccessResult);
  });
});
