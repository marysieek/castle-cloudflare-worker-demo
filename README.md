# Castle Cloudflare Worker Demo
Cloudflare Worker Demo

## Installation

1. Deploy the worker using `Deploy with Workers` button:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/castle/cloudflare-worker-demo)

2. Upload Cloudflare secret, available in [Castle Dashboard](https://dashboard.castle.io/settings/general) as `CLOUDFLARE_KEY`.

```bash
wrangler secret put CLOUDFLARE_KEY --env castle-cloudflare-worker-demo
```
