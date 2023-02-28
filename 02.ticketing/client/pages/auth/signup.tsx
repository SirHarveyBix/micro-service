import React, { useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event: { preventDefault: () => void }) => {
    void event.preventDefault();

    const response = await axios
      .post('/api/users/signup', {
        email,
        password,
      })

      .catch((error) => {
        setErrors(error.response.data.errors);
      });

    console.log('%csignup.tsx line:21 response', 'color: #3f88b8;', response);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
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
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
