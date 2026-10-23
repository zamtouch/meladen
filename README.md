# Meladen Energy

Public website and staff admin for Meladen Energy. The seven public pages and the company facts follow `docs/Meladen_Energy_Website_Blueprint.md`. The app uses the same shape as the Pabaa project: Next.js App Router, Payload CMS, SQLite, and server actions.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3010 for the site and http://localhost:3010/admin for staff.

Copy `.env.example` to `.env.local`. If `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set before the first boot, and no staff user exists yet, that account is created. Otherwise create the first administrator at `/admin`.

## Public pages

`/` · `/about` · `/solutions` · `/stations` · `/responsibility` · `/news` · `/contact`

Station details open on `/stations`. Articles open on `/news?article=slug`. The bulk quotation form is `/solutions#request-quote`. There is no eighth marketing page. The enquiry privacy notice opens from the footer.

## What staff can edit

- Contact details
- Wording for the seven pages
- Stations, amenities, and verified addresses or coordinates
- Timeline labels
- News drafts and publication
- Approved PDF documents
- Bulk enquiries and contact messages, including status
- Spreadsheet downloads at `/api/quotes/export` and `/api/messages/export` while signed in

Roles are Administrator, Content Editor, and Sales User. Sales users see the inbox. Editors see content. Administrators see both, plus the audit log.

## Facts that stay blank until Meladen confirms them

Station street addresses, map coordinates, phones, opening hours, and per-station products are empty on purpose. Sesheke and Solwezi are planned, not open. The site does not show a price, a delivery guarantee, leadership names, or a fleet count. News drafts are not on the public news page until someone publishes them with a date.

Photographs are not used as stand-ins for Meladen stations or tankers. Upload a picture in the admin only when the company can publish it.

## Email

Enquiries are saved first. A staff email is sent only when `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_NOTIFY_EMAIL` are set. If they are missing, or the send fails, the enquiry remains saved and the notification status explains why. The customer still sees the success message after a successful save.

## Data

SQLite lives at `meladen.db` in the project folder (`DATABASE_URL`). The first boot creates the tables and seeds stations, timeline, page wording, and unpublished article drafts. A copy is written to `data/backups` when the file is healthy. Keep that file on persistent disk. Do not rely on a serverless filesystem for the live database or uploads.

Pictures go to `public/uploads/pictures`. PDFs go to `public/uploads/publications`.

## Checks

```bash
npm test
npm run typecheck
npm run build
```
