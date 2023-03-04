import React, { useEffect } from 'react';
import useRequest, { METHOD } from '../../hooks/useRequest';
import Router from 'next/router';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: METHOD.POST,
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div className="">Signing you out</div>;
};
