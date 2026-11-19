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

## Cloudflare Pages

Connect this repository to Cloudflare Pages and configure:

- **Root directory:** `mobile`
- **Build command:** `npm ci && npm run export:web`
- **Build output directory:** `dist`
- **Production branch:** `main`

The deployed HTTPS app includes a web manifest and branded icons. On iPhone/iPad, use Safari's
Share menu → **Add to Home Screen**; on Android, use Chrome's menu → **Install app**.

Customer accounts and project tracking are not enabled in this launch.
