// api/cognifit-proxy.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = `https://api.cognifit.com${req.url?.replace(/^\/api/, '')}`;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      host: 'api.cognifit.com',
    },
    body: req.method !== 'GET' ? req.body : undefined,
  });

  const data = await response.text();

  res.status(response.status).send(data);
}
