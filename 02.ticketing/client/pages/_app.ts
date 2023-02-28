import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { AppProps } from 'next/app';

export default ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
