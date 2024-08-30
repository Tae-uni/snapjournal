#Unable to get local issuer certificate
##Issues
After setting up Caddy as a reverse proxy setting with Https, `unable to get loacl issuer certificate` error occurred. There are a few potential reasons for this error.  

1. Certificate problems.  
2. SSL/TLS Handshake - `curl -v https://localhost:3000`  
3. .env settings  
4. CORS settings (Strapi)  
5. **Axios request**  

##Solutions
In this case, 1~4 were correctly configured, but 5. Axios request were not accepting the Caddy certificate. To resolve this, the certificate needs to be  menually added through the `axiosInstance.ts` file.

```ts
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
```  
And easily use this axiosInstance when it needs communicate with the backend via axios.  
**Note:** This approach can only be used on the server side.