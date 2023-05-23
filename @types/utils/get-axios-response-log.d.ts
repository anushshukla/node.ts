import { AxiosResponse } from 'axios';
type AxiosResponseStruct = Omit<AxiosResponse, 'config' | 'request'>;
declare const _default: (response?: AxiosResponse<any, any>) => AxiosResponseStruct;
export default _default;
