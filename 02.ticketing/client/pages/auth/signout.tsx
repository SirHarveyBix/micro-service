import React, { useEffect } from 'react';
import useRequest, { METHOD } from '../../hooks/useRequest';
import Router from 'next/router';

export default (): JSX.Element => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: METHOD.POST,
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div className="">Signing you out</div>;
};
