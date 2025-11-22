# TinyLink

TinyLink is a small URL shortener built with Next.js (Pages router) and Postgres.

## Features
- Create short links with optional custom codes (6-8 alphanumeric).
- Redirect on `/:code` with HTTP 302 and atomic click increment.
- Dashboard: list, search, copy, delete.
- Stats page: `/code/:code`.
- Health endpoint: `/healthz`.
- API endpoints (for autograder):
  - `POST /api/links`
  - `GET /api/links`
  - `GET /api/links/:code`
  - `DELETE /api/links/:code`

## Setup (local)
1. Create Postgres DB named `tinyurl`.
2. Copy `.env.example` to `.env` and update `DATABASE_URL`.
3. Run migrations: `npm run migrate` (requires psql CLI).
4. Install: `npm install`
5. Run dev server: `npm run dev`
6. Run API tests: `npm run test:api`

## Notes
- Codes follow regex `[A-Za-z0-9]{6,8}`.
- Duplicate custom codes return HTTP `409`.
- Deleting a link returns `204` and redirects to that code must return `404`.
