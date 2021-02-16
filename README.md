
<div align="center">
  <img align="center" alt="Castle logo" src='./assets/castle-logo.svg' width='150'/>
</div>
<div align="center">
  <h1>Castle Cloudflare Worker Demo</h1>
</div>
<div align="center">
  <image alt="Build status" src="https://img.shields.io/github/workflow/status/castle/cloudflare-worker-demo/Build"/>
  <image alt="Package version" src="https://img.shields.io/github/package-json/v/castle/castle-cloudflare-worker-demo"/>
  <image alt="License" src="https://img.shields.io/github/license/castle/castle-cloudflare-worker-demo"/>
</div>

## Installation

1. Press the `Deploy with Workers` button and follow the instructions:
  [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/castle/castle-cloudflare-worker-demo)

2. Check if `castle-cloudflare-worker-demo` repository is forked to your organization. At this step, Github build should fail

3. Navigate to `Settings > Secrets` tab of the forked repository

4. Update `Repository Secrets`:

    * Add `CF_ACCOUNT_ID` (Cloudflare Account ID) and `CF_API_TOKEN` (Cloudflare API Token with "Edit Workers" permissions) to Github actions secrets

    * Add Castle API secret, available in [Castle Dashboard](https://dashboard.castle.io/settings/general) as `CASTLE_API_SECRET` to Github actions secrets

5. Re-run Github build
