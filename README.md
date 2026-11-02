# Closest NDB

[![CI](https://github.com/RISCfuture/closest-ndb/actions/workflows/ci.yml/badge.svg)](https://github.com/RISCfuture/closest-ndb/actions/workflows/ci.yml)
[![Deploy](https://github.com/RISCfuture/closest-ndb/actions/workflows/deploy.yml/badge.svg)](https://github.com/RISCfuture/closest-ndb/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This website displays a simulated ADF instrument that tells you where the
closest NDB to you is. NDB data comes from the FAA’s current NASR subscription
and is stored in memory using Pinia.

GitHub Actions checks the effective NASR cycle daily at 09:17 UTC and generates
and publishes data when the cycle changes. Generation runs on Linux using Swift.
The JSON is included in the GitHub Pages deployment and cached for offline use.
A cycle marker tracks successful publication. Failed updates leave the last
successful deployment available.
Manual and code-triggered deployments also generate the current dataset.

The front-end is written in Vue.js 3. Location comes from the HTML5 Geolocation
API.

The ADF is an SVG yeeted from the FAA Pilot's Handbook of Aeronautical Knowledge
(PHAK). The pointer polygon is animated to note the initial bearing to the NDB.

Deployment is automatic using GitHub Actions.

## Local development

Use the Node version in `.nvmrc`, the pnpm version pinned in `package.json`, and
Swift 6.4. On Ubuntu, also install `zlib1g-dev` for the generator.

From the repository root:

```sh
pnpm install --frozen-lockfile
(cd generate-navaids && swift run -c release)
cp generate-navaids/ndbs.json generate-navaids/ndbs-cycle.txt public/
pnpm dev
```

Open the URL printed by Vite. The app needs the generated JSON to load NDB data.
Repeat generation to refresh the FAA dataset; generated files are ignored by Git.
See the [generator instructions](generate-navaids/README.md) for more details.

## Tests

```sh
CI=true pnpm test:unit --run
CI=true pnpm test:e2e
```

The E2E command builds the site and starts a local preview server. Playwright
intercepts the NDB request and supplies a fixed dataset, so E2E tests do not
require generating FAA data. Unit tests also mock their data.
