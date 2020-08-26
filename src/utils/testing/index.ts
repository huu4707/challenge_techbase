import axios from 'axios';
require('dotenv').config();

interface IHeaders {
  [name: string]: string;
}
interface IRequestOptions {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  headers?: [IHeaders];
  params?: any;
}

interface IResponse {
  status: number;
  headers: IHeaders[];
  response: {
    data: any;
    error: any;
  };
}
class SetupRequest {
  private baseURL = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/api/v1';
  request = async (options: IRequestOptions): Promise<IResponse> => {
    try {
      options.url = options.url !== '' ? this.baseURL + options.url : this.baseURL;
      const rs = await axios(options);
      return {
        status: rs.status,
        headers: rs.headers,
        response: rs.data
      };
    } catch (e) {
      return {
        status: e.response.status,
        headers: e.response.headers,
        response: e.response.data
      };
    }
  };
}

export { SetupRequest };
