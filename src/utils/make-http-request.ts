import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getAxiosResponseLog from '@utils/get-axios-response-log';
import { logger as parentLogger } from './get-logger';

const logger = parentLogger.child({
  filepath: __filename
});

axios.interceptors.request.use((config: any) => {
  if (!config.url) {
    return config;
  }
  Object.entries(config.params || {}).forEach(([k, v]) => {
    config.url = config.url.replace(`{${k}}`, encodeURIComponent(v as any));
  });

  return {
    ...config,
    url: config.url
  };
});

export const makeHttpCall = (
  request: AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<AxiosResponse<any>> => {
  return axios(request)
    .then(response => {
      logger.info(
        {
          request,
          response: getAxiosResponseLog(response)
        },
        'HTTP Request-Response'
      );
      return response;
    })
    .catch(error => {
      logger.error(
        {
          request,
          response: error?.response
            ? getAxiosResponseLog(error.response)
            : error?.message
        },
        'HTTP Request-Response'
      );
      throw error;
    });
};
