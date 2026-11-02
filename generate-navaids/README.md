# generate-navaids

Generates `ndbs.json` and `ndbs-cycle.txt` from the effective FAA NASR subscription.
Requires Swift 6.4; supports macOS and Linux. On Ubuntu, install `zlib1g-dev`.

```sh
cd generate-navaids
swift run -c release
cp ndbs.json ndbs-cycle.txt ../public/
```

Print the effective cycle without downloading data:

```sh
swift run -c release generate-navaids --print-cycle
```

Each generation downloads the effective subscription into memory. GitHub Actions
caches only build products. The deployment workflow publishes the generated files
through GitHub Pages.
