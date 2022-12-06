# Closest NDB

This website displays a simulated ADF instrument that tells you where the
closest NDB to you is. NDB data is downloaded and parsed by hand from the FAA
National Flight Data Center (NFDC) Facility Aeronautical Data Distribution
System (FADDS) archive. It is stored in `src/data/ndbs.json`.  NDB data is
stored in state memory using Vuex.

The front-end is written in Vue.js 3. Location comes from the HTML5 Geolocation
API.

The ADF is an SVG yeeted from the FAA Pilot's Handbook of Aeronautical Knowledge
(PHAK). The pointer polygon is animated to note the initial bearing to the NDB.

Deployment is automatic using GitHub Actions.
