JEBG Unit Security & Surveillance System Website

Open index.html in a modern browser or upload this folder to any static web host.

Main files:
- index.html
- css/style.css
- js/app.js
- assets/images/*
- assets/videos/standard-simulation.mp4

Before public deployment:
1. Review contact email and WhatsApp in index.html.
2. Add your official domain when available.
3. Add more product videos/screenshots by placing them in assets and updating the corresponding HTML.
4. For a fully offline website, download the Inter and Space Grotesk fonts or remove the Google Fonts links to use system fonts.

No framework or build step is required.


FUTURE BASIC / VISUAL INSTALLER UPDATES
=======================================
The website now has two independent release channels.
Edit js/release-config.js only.

For either 'basic' or 'visual':
1. Upload the new installer to a GitHub Release (recommended) or trusted download host.
2. Set enabled: true.
3. Set version, releaseDate, fileSize, sha256, downloadUrl and releaseNotesUrl.
4. Commit only release-config.js.

The website will automatically turn the matching download button on and show the new version.
The other edition is unaffected.

SECURITY RECOMMENDATION
Code-sign public Windows installers and publish a SHA-256 checksum. Do not publish source code with the installer.

FACILITY IMAGES
The new Industries section uses lightweight stylized CSS artwork so there are no image licensing issues in this package. Replace these backgrounds later with your own or properly licensed commercial facility photographs if desired.


USAGE REQUEST FORM
------------------
The Request JEBG Usage button is independent from Basic/Visual downloads.
To replace the Google Form later, edit only js/release-config.js and change:
window.JEBG_SITE_CONFIG.usageRequest.url
No HTML redesign is required.
