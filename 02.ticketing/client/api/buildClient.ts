import axios from 'axios';
import { NextPageContext } from 'next/types';
import { IncomingMessage } from 'node:http';

export default (context: NextPageContext) => {
  if (typeof window === 'undefined') {
    const { headers } = context.req as IncomingMessage;

    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      // ajout du Host et des cookies dans les headers
      headers: headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};
