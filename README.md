# Seattle MasterFix app

Standalone Expo app for Seattle MasterFix. The app code is in `mobile/`; the top-level `src/`
contains the public business and service content it shares with the website.

## Run and validate

```bash
npm ci --prefix mobile
npm --prefix mobile run start
npm --prefix mobile run ios       # iOS simulator (macOS)
npm --prefix mobile run android  # Android emulator
npm --prefix mobile run typecheck
npm --prefix mobile run export:web
```

The web export is written to `mobile/dist/`. The estimate form uses the existing public Formspree
endpoint. Confirm its notification recipient is `Bill@seattlemasterfix.com` and send an
owner-approved test before announcing the app; no real delivery test has been sent.

## GitHub Pages

GitHub Actions exports the Expo web app and deploys it to the repository's Pages site on every push
to `main`. Enable GitHub Pages with **Build and deployment → Source: GitHub Actions**. The workflow
uses the `mobile/` workspace and configures the repository subpath automatically.

The public app URL is <https://bilalsahak.github.io/seattle-masterfix-app/>.

The deployed HTTPS app includes a web manifest and branded icons. On iPhone/iPad, use Safari's
Share menu → **Add to Home Screen**; on Android, use Chrome's menu → **Install app**.

Customer accounts and project tracking are not enabled in this launch.
