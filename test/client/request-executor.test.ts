import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestExecutor from '../../src/client/request-executor';
import { Authentication } from '../../src/client/auth/authentication';
import { IonicApiError } from '../../src/client/errors';

describe('RequestExecutor', () => {
  const baseURL = 'https://example.com';
  const authenticationMock: Authentication = {
    authenticate: (req: AxiosRequestConfig) => req,
  };

  let axiosCreateOriginal: (opts: any) => AxiosInstance;
  let axiosMockAdapter: AxiosMockAdapter;

  beforeAll(() => {
    axiosCreateOriginal = axios.create;
    axios.create = jest.fn().mockImplementation(() => {
      const axiosInstance = axiosCreateOriginal({ baseURL });
      axiosMockAdapter = new AxiosMockAdapter(axiosInstance);
      return axiosInstance;
    });
  });

  afterAll(() => {
    axios.create = axiosCreateOriginal;
  });

  afterEach(() => {
    axiosMockAdapter.reset();
  });

  test("should create 'AxiosInstance' with 'baseURL'", () => {
    new RequestExecutor(baseURL, authenticationMock);
    expect(axios.create).toBeCalledWith({ baseURL });
    (axios.create as jest.Mock).mockClear();
  });

  test('should authenticate requests', async () => {
    const url = '/test';
    const config = { url: baseURL + url, method: 'get' };
    const executor = new RequestExecutor(baseURL, authenticationMock);
    const spy = jest.spyOn(authenticationMock, 'authenticate');
    axiosMockAdapter.onGet(url).reply(200, {});

    expect.assertions(1);
    await executor.get(url);

    expect(spy.mock.calls[0][0]).toMatchObject(config);
    spy.mockRestore();
  });

  it("should throw 'IonicApiError' with 'status', 'data' and 'message' when response is not 2xx", async () => {
    const url = '/test';
    const status = 500;
    const message = 'something went wrong';
    const data = { code: 12345, message };
    const executor = new RequestExecutor(baseURL, authenticationMock);

    axiosMockAdapter.onGet(url).reply(status, data);
    expect.assertions(4);
    try {
      await executor.get(url);
    } catch (error) {
      expect(error).toBeInstanceOf(IonicApiError);
      expect(error.message).toBe(message);
      expect(error.httpStatus).toBe(status);
      expect(error.data).toMatchObject(data);
    }
  });

  it("should throw 'Error' when no response was received", async () => {
    const url = '/test';
    const executor = new RequestExecutor(baseURL, authenticationMock);

    axiosMockAdapter.onGet(url).timeout();
    expect.assertions(2);

    try {
      await executor.get(url);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toMatch(/timeout/);
    }
  });

  it("should throw 'Error' on network error", async () => {
    const url = '/test';
    const executor = new RequestExecutor(baseURL, authenticationMock);

    axiosMockAdapter.onGet(url).networkError();
    expect.assertions(2);

    try {
      await executor.get(url);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Network Error');
    }
  });
});
