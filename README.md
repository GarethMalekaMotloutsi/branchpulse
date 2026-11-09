# BranchPulse

BranchPulse is a responsive retail branch technology incident-management prototype for the Melsoft Academy project. It centralises branch, asset and incident records, technician assignment, service activity and repeat-fault visibility.

## MVP capabilities
- Branch and asset register with synthetic Gauteng demo data.
- Incident list, search and status filters.
- Incident reporting, technician assignment, work progression, service activity and resolution.
- Role-specific navigation for Administrator, Support Coordinator, Technician and Branch Reporter.
- Repeat Fault Watch: assets with at least three incidents in the rolling 30-day window.
- Supabase client integration and a PostgreSQL schema with RLS policies and guarded database functions.

## Run locally
Requirements: Node.js 26.x (as specified in the implementation plan) and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

With no Supabase environment variables, the app runs in **Demo Data** mode using fictional in-memory records so the screens and workflows can be reviewed. Changes in Demo Data mode are held in the current browser session only and are not a secure backend.

To connect Supabase:
1. Create a Supabase project.
2. Apply `supabase/migrations/202611090001_branchpulse_schema.sql` using the Supabase SQL editor or CLI.
3. Create four synthetic Auth users and matching `profiles` rows. Use fictional email addresses and test-only passwords.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`.
5. Ensure the initial Administrator profile is provisioned through trusted SQL/admin setup, not public sign-up.
6. Configure a JWT-verified `admin-manage-staff` Edge Function before enabling staff account creation in a hosted environment.

The browser uses only the Supabase anon/publishable key. Never put `SUPABASE_SERVICE_ROLE_KEY` in a `VITE_` variable or frontend code.

## Commands
```bash
npm test       # Vitest unit and component tests
npm run lint   # TypeScript check
npm run build  # Production build
npm run check  # lint + tests + build
```

## Demo data
The fictional organisation is Northline Retail Demo, with Midrand Central, Sandton North and Pretoria East branches. The demo includes fictional equipment and incident records. Do not replace these with real retailer data.

## Demo roles
The role preview control is a **presentation-only demo switcher**. It is not authentication and must not be used to demonstrate real security. For permission verification, configure separate Supabase Auth users for each role and test the database RLS policies. No shared demo passwords are included in this repository.

## Known limitations
- The demo fallback is not persistent and does not enforce server-side permissions.
- The staff Edge Function, full Supabase Auth onboarding and complete per-role RLS test suite still need to be configured and verified.
- Stitch exports S1-S11 and M1-M6 were not present in the source materials; the UI is an original implementation based on the written design tokens and screen inventory, not a pixel-matched Stitch export.
- The full nine-phase TDD plan is not complete. This repository is an accelerated MVP implementation and must not be represented as having passed all planned tests or as production-ready.

## Security
Never commit `.env`, passwords, service-role keys, real store data or personal information. Only `.env.example` belongs in version control.
