import { AxiosResponse } from 'axios';
type AxiosResponseStruct = Omit<AxiosResponse, 'config' | 'request'>;
export default function getAxiosResponseLog(response?: AxiosResponse<any, any>): AxiosResponseStruct;
export {};
