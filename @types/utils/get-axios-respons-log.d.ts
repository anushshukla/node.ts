import { AxiosResponse } from 'axios'
declare type AxiosResponseStruct = Omit<AxiosResponse, 'config' | 'request'>
export default function getAxiosResponseLog(
  response?: AxiosResponse<any, any>
): AxiosResponseStruct
export {}
