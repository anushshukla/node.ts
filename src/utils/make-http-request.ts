import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getAxiosResponseLog from '@utils/get-axios-response-log';
import getLogger from '@utils/get-logger';

const logger = getLogger(__filename);

function axiosInterceptor(config: AxiosRequestConfig) {
  if (!config.url) {
    return config;
  }

  const { params = {} } = config;
  Object.entries(params).forEach(([keyName, value]) => {
    config.url = config.url?.replace(`{${keyName}}`, encodeURIComponent(value as string));
  });

  return {
    ...config,
    url: config.url,
  };
}

axios.interceptors.request.use(axiosInterceptor);

export const makeHttpCall = (
  request: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<AxiosResponse<any>> => {
  return axios(request)
    .then(response => {
      logger.info(
        {
          request,
          response: getAxiosResponseLog(response),
        },
        'HTTP Request-Response',
      );
      return response;
    })
    .catch(error => {
      logger.error(
        {
          request,
          response: error?.response ? getAxiosResponseLog(error.response) : error?.message,
        },
        'HTTP Request-Response',
      );
      throw error;
    });
};
