import React, { useState } from 'react';
import axios from 'axios';
import { UseRequestI, useRequestProps } from './types';

export default ({
  url,
  method,
  body,
  onSuccess,
}: useRequestProps): UseRequestI => {
  const [errors, setErrors] = useState<UseRequestI['errors']>(null);

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
