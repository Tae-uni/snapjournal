# Caddy

### Why did I choose 'Caddy'?
I initially tried using `mkcert`, a tool for creating SSL certificates. However, Strapi does not support SSL directly because it is highly insecure to expose a Node.js application to the public web on a low port. Instead, they recommend using a proxy application like Nginx, Caddy, Apache, or others to handle edge routing for Strapi. [How do I set up SSL with Strapi?](https://docs.strapi.io/dev-docs/faq#how-do-i-setup-ssl-with-strapi)

Caddy provides automatic HTTPS and has a simple configuration, making it easy to set up. It is well-suited for SnapJournal.  
[Caddy File Concepts](https://caddyserver.com/docs/caddyfile/concepts)

```caddyfile
https://localhost:3000 {
  tls internal
  reverse_proxy localhost:3002
}

https://localhost:1337 {
  tls internal
  reverse_proxy localhost:8000
}
```
After installing Caddy, I created this file in the root directory. The configuration means that when users connect to `https://localhost:3000`, Caddy will act as a reverse proxy, forwarding these requests to `localhost:3002`, where the Next.js application is running. Similarly, requests to `https://localhost:1337` will be proxied to `localhost:8000`, where another application (such as Strapi) might be running.

This setup allows Caddy to manage SSL/TLS certificates and handle HTTPS connections, while your applications run on their respective ports without needing to manage SSL directly.  

###Here's command for Caddy  
`caddy run`  - Runs Caddy in the foreground, ideal for development.(Real-time logs)  
`caddy start`  - Starts Caddy in the background, suitable for production.  
`caddy stop`  - Stops the Caddy server that is running in the background.
