import { NextPage, NextPageContext } from 'next/types';
import React from 'react';
import buildClient from '../api/buildClient';
import { CurrentUserI } from '../types/user-interface';

const LandingPage: NextPage<{ currentUser: CurrentUserI }> = ({
  currentUser,
}) => {
  return currentUser ? (
    <h1>You are signed in !</h1>
  ) : (
    <h1>You are NOT signed in !</h1>
  );
};

LandingPage.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
