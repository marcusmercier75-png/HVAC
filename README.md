# Settled — HVAC replacement website

A one-page site for a fixed-price, replacement-only HVAC service. It's written for property managers, real estate investors and agents, and it has a section for installers.

Pages:

- `index.html`: homepage, a high-level overview
- `real-estate.html`: for property managers, owners, investors and agents
- `contractors.html`: for HVAC contractors joining the network
- `homeowners.html`: for homeowners and tenants
- `request.html`: general request form
- `styles.css`: shared styles
- `site.js`: form handling for every page, and the phone layout for the homepage picture

No build step.

## Before going live

- **Name:** "Settled" is a working name. Search `Settled` across the .html files to change it.
- **Email:** the form opens an email to `quotes@example.com`. Change `CONTACT_EMAIL` at the top of `site.js` to your real inbox.
- **Prices:** the $10,000 quote is an example and is labeled as one on the page.

## Publish with GitHub Pages

Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save. The site will be at `https://marcusmercier75-png.github.io/HVAC/`.
