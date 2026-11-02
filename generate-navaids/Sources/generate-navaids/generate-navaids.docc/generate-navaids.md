# ``generate_navaids``

@Metadata {
  @DisplayName("generate-navaids")
}

Generates the `ndbs.json` file from FAA NASR data.

## Overview

Run `swift run -c release` to generate `ndbs.json` and `ndbs-cycle.txt` for the
currently effective NASR cycle. Copy both files into the website’s `public/`
directory for local development. Each generation downloads a fresh subscription into memory.

Use `swift run -c release generate-navaids --print-cycle` to print the effective
cycle without downloading data. The tool supports macOS and Linux with Swift 6.4.
GitHub Actions generates and publishes the files through GitHub Pages when the
NASR cycle changes.
