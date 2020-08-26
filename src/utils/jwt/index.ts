import jwt from 'jsonwebtoken';
import { privateKEY, publicKEY } from './certificates/key';

export function verifyLogInToken(token: string, expiresIn: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let verifyOptions: object = {
      expiresIn: expiresIn,
      algorithm: ['RS256']
    };
    jwt.verify(token, publicKEY, verifyOptions, (err, obj: any) => {
      if (err) return reject({ type: 'TOKEN_EXPIRED', message: 'Token expired' });
      delete obj.iat;
      delete obj.exp;
      resolve(obj);
    });
  });
}

export function createToken(obj: object, expiresIn: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const signOptions: object = {
      expiresIn: expiresIn,
      algorithm: 'RS256'
    };
    jwt.sign(obj, privateKEY, signOptions, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}
