import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';
import { METHOD } from '../../hooks/types';

export default (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: METHOD.POST,
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event: { preventDefault: () => void }) => {
    void event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email adress</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};
