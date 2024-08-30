import axios, { AxiosInstance } from 'axios';
import https from 'https';
import fs from 'fs';

const certPath: string = process.env.CADDY_CERT_PATH as string;

const httpsAgent: https.Agent = new https.Agent({
  ca: fs.readFileSync(certPath),
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'https://localhost:1337',
  httpsAgent,
});

export default axiosInstance;