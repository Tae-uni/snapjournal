import axios, { AxiosInstance } from 'axios';
import https from 'https';
import fs from 'fs';

const certPath: string = process.env.CADDY_CERT_PATH as string;

const httpsAgent: https.Agent = new https.Agent({
  ca: fs.readFileSync(certPath),
  rejectUnauthorized: false,
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_URL || 'https://localhost:5004',
  httpsAgent,
  withCredentials: true,
});

const localAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_URL || 'https://localhost:3000',
  httpsAgent,
  withCredentials: true,
});

export { axiosInstance, localAxiosInstance} ;