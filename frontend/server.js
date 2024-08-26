const express = require('express');
const next = require('next');
const https = require('https');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const server = express();

  const httpsOptions = {
    key: fs.readFileSync('../certificates/localhost-key.pem'),
    cert: fs.readFileSync('../certificates/localhost.pem'),
  }

  https.createServer(httpsOptions, server).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });
});