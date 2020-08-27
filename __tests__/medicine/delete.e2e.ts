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

describe('delete medicine', () => {
  const expectedFailedResult = {
    errors: expect.toBeArray()
  };
  const expectedSuccessResult = {
    data: expect.toBeObject(),
    meta: expect.toBeNil() || expect.toBeObject()
  };
  // Missing token
  test('Missing token must be fail', async () => {
    const result = await callAPI({ method: 'delete', url: `/medicine/delete?medicineId=${medicineId}` });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  // Missing medicineId
  test('Missing medicineId must be fail', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const result = await callAPI({ method: 'delete', url: `/medicine/delete`, headers });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  //medicineId not found
  test('MedicineId not found must be fail', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const result = await callAPI({ method: 'delete', url: `/medicine/delete`, headers });
    expect(result.response).toMatchObject(expectedFailedResult);
  });

  //   // // Successful case
  test('Successful case', async () => {
    const headers: IHeaders = { authorization: `Bearer ${token}` };
    const result = await callAPI({ method: 'delete', url: `/medicine/delete?medicineId=${medicineId}`, headers });
    console.log('result', result);
    expect(result.response).toMatchObject({ data: expect.toBeArray(), meta: expect.toBeNil() });
  });
});
