import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import type { AppContext, AppProps } from 'next/app';
import buildClient from '../api/buildClient';
import Header from '../components/header';
import { CurrentUserI } from '../types/user-interface';

interface CustomAppProps extends AppProps {
  currentUser: CurrentUserI;
}

const AppComponent = ({
  Component,
  pageProps,
  currentUser,
}: CustomAppProps): JSX.Element => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { pageProps, ...data };
};

export default AppComponent;
