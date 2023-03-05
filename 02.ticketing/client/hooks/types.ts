import { AxiosResponse } from 'axios';
import { UserI } from '../types/user-interface';

export interface useRequestProps {
  url: string;
  method: METHOD;
  body?: UserI;
  onSuccess: (response: AxiosResponse) => void;
}

export interface UseRequestI {
  doRequest: () => Promise<void>;
  errors: JSX.Element | null;
}

export enum METHOD {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
}
