import { AxiosResponse } from 'axios';

type AxiosResponseStruct = Omit<AxiosResponse, 'config' | 'request'>;

export default function getAxiosResponseLog(response: AxiosResponse): AxiosResponseStruct {
  const { data, headers, status, statusText } = response;
  return { data, headers, status, statusText };
}
