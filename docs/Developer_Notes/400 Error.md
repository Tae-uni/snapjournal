# 400 Error  
Postman request and response are normally works. Even the backend log ctx is sending right data.

## Possibility
There's 2 possibility cause this error.  

1. Proxy Settings
2. CORS Policy

## Solutions
1. Turn off the Caddy Proxy. and directly sending request to server from Next.js  
2. 