import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface useRequestProps {
  url: string;
  method: METHOD;
  body: BodyProperties;
  onSuccess: (response: AxiosResponse) => void;
}

interface BodyProperties {
  email?: string;
  password?: string;
}

export enum METHOD {
  POST = 'post',
  GET = 'get',
}

export default ({ url, method, body, onSuccess }: useRequestProps) => {
  const [errors, setErrors] = useState<null | JSX.Element>(null);

  const doRequest = async () => {
    await axios[method](url, body)
      .then((response) => {
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        setErrors(
          <div className="alert alert-danger">
            <h4>Ooops ..</h4>
            <ul>
              {error.response.data.errors.map((err: { message: string }) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      });
  };

  return { doRequest, errors };
};
