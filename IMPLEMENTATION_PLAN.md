% BranchPulse
% Implementation Plan | v0.2
% Melsoft Academy | 4 November 2026

**Submission status:** Proposed for academic review. This plan translates BranchPulse PRD v0.2 into a phased technical build sequence. It is not approval to begin coding. The open decisions in Section 18 must be reviewed and resolved before Phase 1 begins.  
**Project:** BranchPulse - Retail Branch Technology and Incident Management  
**Source of truth:** `docs/PRD.md` v0.2

---

# 0. Plan details

| Field | Value |
|---|---|
| App name | BranchPulse |
| Product requirements | BranchPulse PRD v0.2, 4 November 2026 |
| Platform | Responsive web application |
| Screen reference | S1-S11 and M1-M6 as listed in Section 7.3; graphic exports are not yet supplied |
| Plan version | v0.2 |
| Repository | To be created |
| Status | Proposed for academic review; build blocked pending Section 18 decisions and screen exports |
| Last updated | 4 November 2026 |

# 1. Start here (instructions for the coding agent)

Before writing any code:

1. Read this whole file from top to bottom.
2. Read `docs/PRD.md` and use it as the source of truth for product behaviour, roles, business rules and user-facing wording.
3. Review every design export listed in Section 7.3. If a required export is missing, stop and ask for it.
4. Check Section 18. If any blocking clarification is still Open, stop and ask the human. Do not start.
5. Check that the prerequisites in Section 4.2 are installed.
6. Check the current repository state before changing files. Do not overwrite existing work.
7. Start Phase 1 only after the human explicitly approves it. Follow Section 2 at all times.

# 2. Rules for the coding agent (copy word for word, do not edit)

1. One phase at a time. Only work on the phase the human asked for. When that phase's Definition of Done is complete, stop and wait for the human to say "Start Phase <number>".
2. Test-driven development (TDD) for every task. Follow the cycle in Section 12.1:
   - Write the test.
   - Run it and see it fail for the right reason.
   - Write the smallest code that makes it pass.
   - Run all tests.
   - Refactor while all tests still pass.
3. Never cheat a test. Never delete, skip, weaken or change a test just to make it pass. If you believe a test is wrong, stop and explain why to the human.
4. Never break earlier work. Every test from earlier phases must still pass before a phase is done.
5. Build only what is planned. Build only what is in this file and docs/PRD.md. Never build anything in Section 3.3 (Deferred).
6. Ask, don't guess. If anything is missing, unclear or contradictory, stop, add it to Section 18, and ask the human.
7. Match the designs. Every screen must match its design in Section 7.3: layout, order, labels, text, colours and spacing. Use the design tokens in Section 7.1. Never hard-code colours, font sizes or spacing.
8. Every state, every screen. Each screen must handle every state listed for it in Section 7.3 (chosen from normal, empty, loading, error, offline, success, plus any screen-specific states).
9. Exact wording. Use the exact labels and messages from the PRD. Never invent wording.
10. Security first.
    Never put secret keys in app code, logs, test files or Git.
    Every permission rule in Section 9 must be enforced on the server or database, never only in the app.
    Every permission rule must have a test.
11. Full check before "done". Run the full check command (Section 4.3) before saying a phase is done, then add a short summary of the results to the Progress log (Section 17).
12. Record your progress. After each phase:
    tick the checkboxes for that phase in this file;
    add a row to the Progress log;
    commit using the commit message given in the phase.
13. No surprise libraries. Do not add, remove or upgrade any library or tool not listed in Section 4.1 without asking the human first.
14. Stuck rule. If the same problem is still failing after 3 attempts, stop and report:
    what you tried;
    the exact error;
    what you need from the human.
15. Clean code. Follow the folder structure in Section 5. Use the PRD's key terms (Section 3.4) for names in code. Keep files small and focused.

# 3. Project summary and scope

## 3.1 Summary

BranchPulse is a responsive web application for recording retail branch technology incidents and tracking the equipment involved. A Branch Reporter logs a problem against an asset at their own branch. A Support Coordinator reviews and assigns the incident. The assigned Technician records progress, optional service activity and a resolution summary. Administrators and Support Coordinators use the dashboard and Repeat Fault Watch to review workload and identify assets with repeated incidents.

Platform: responsive browser-based web app, mobile-first at 390px and checked on tablet and desktop at 1440px. Hosted on Vercel. Supabase provides authentication, PostgreSQL data and Row-Level Security.

## 3.2 Features in scope

| ID | Feature | Priority | Built in phase |
|---|---|---|---|
| F1 | Staff account and role access | Must | 3 |
| F2 | Branch and asset register | Must | 4 |
| F3 | Incident reporting and coordination | Must | 5 |
| F4 | Technician workflow and visit history | Must | 6 |
| F5 | Operational dashboard and Repeat Fault Watch | Should | 7 |

Phases 1 (Foundation), 2 (Data and security), 8 (Hardening) and 9 (Release) do not introduce new product features.

## 3.3 Deferred: do NOT build

The following PRD non-goals and future features are excluded from this plan:

- POS, ERP, inventory, HR or identity-management integrations.
- Automatic device discovery, network scanning, remote desktop or remote device control.
- Customer accounts or a public customer service portal.
- WhatsApp, SMS, email or push notifications.
- In-app chat, voice or video calls.
- Procurement, parts inventory, suppliers, cost accounting or payment processing.
- SLA automation, contract management or penalty calculations.
- Native Android or iPhone applications.
- Offline data capture or background synchronisation.
- File, photo, CCTV or document uploads.
- Multi-company SaaS tenancy and self-service registration.
- Predictive maintenance, AI diagnosis or automated repair recommendations.
- GPS, technician tracking, maps, scheduling or route optimisation.
- Deleting incidents or editing historical status records.
- Any feature not listed in PRD Section 3.1.

## 3.4 Key terms (use these names in code)

| PRD term | Code name | Meaning |
|---|---|---|
| Branch | `Branch` / `branches` | Retail store/location recorded in the application. |
| Asset | `Asset` / `assets` | Technology equipment registered at a branch. |
| Incident | `Incident` / `incidents` | A record of a technology problem affecting an asset. |
| Branch Reporter | `BranchReporter` / `branch_reporter` | User who reports incidents for one assigned branch. |
| Support Coordinator | `SupportCoordinator` / `support_coordinator` | User who reviews and assigns incidents across branches. |
| Technician | `Technician` / `technician` | User who investigates incidents assigned to them. |
| Administrator | `Administrator` / `administrator` | User who manages staff access and branch records. |
| Incident Update | `IncidentUpdate` / `incident_updates` | Append-only progress or coordination note. |
| Technician Visit | `TechnicianVisit` / `technician_visits` | Record of on-site or remote work on an incident. |
| Status History | `IncidentStatusHistory` / `incident_status_history` | Immutable record of status transitions. |
| Repeat Fault Watch | `RepeatFaultWatch` | Query/view showing assets with at least three incidents in the rolling 30-day window. |

# 4. Tech stack, prerequisites and commands

## 4.1 Stack

| Layer | Tool | Version | Used for |
|---|---|---|---|
| Frontend | React with Vite and React Router | React 19.3, Vite 8.3.x, React Router 8.5.1 | Responsive screens and route guards. |
| Language | TypeScript, npm | Latest compatible stable TypeScript; Node.js 26.x Active LTS | Application, tests and scripts. |
| Styling | Tailwind CSS with `@tailwindcss/vite` | Tailwind CSS 4.3.4 and matching Vite plugin | CSS-first design tokens and responsive layouts. |
| Icons | lucide-react | Compatible stable version at setup | Interface icons. |
| Backend/database | Supabase PostgreSQL, Auth and RLS | Current supported version at setup | Data, authentication and row permissions. |
| Client library | @supabase/supabase-js | v2 | Auth session and database queries. |
| Database functions | PostgreSQL functions and triggers | Supabase-supported PostgreSQL | Assignment checks, status transitions and audit history. |
| Unit/component tests | Vitest, React Testing Library and jsdom | Compatible stable versions at setup | Business rules and screen states. |
| Database tests | Supabase CLI and pgTAP | Current supported versions at setup | Constraints, triggers, functions and RLS. |
| End-to-end tests | Playwright | Compatible stable version at setup | Browser workflows at mobile and desktop viewports. |
| Lint/type check | ESLint and TypeScript compiler | Compatible stable versions at setup | Static quality checks. |
| Build/hosting | Vite build and Vercel | Vite 8.3.x; Vercel Node.js 26 support | Production build and hosted demo. |
| Version control | Git and GitHub | Current supported version | Source and document history. |

No separate Express or NestJS API is included. The frontend uses the Supabase public client under RLS. Assignment and status transitions are PostgreSQL functions. Staff identity creation is handled by a Supabase Edge Function that verifies the caller's JWT and Administrator role before using privileged Auth operations. The service-role key is never used by browser code.

The version baseline was checked on 4 November 2026. Node.js 26 is in Active LTS and is supported by Vercel for builds and Functions; React 19.3 is the current React documentation version; Vite 8.3 and React Router 8.5.1 are current supported releases; Tailwind CSS 4.3.4 is the current package release. Re-check compatible patch versions when installing, record the selected versions in `package-lock.json`, and do not upgrade them silently. References: [Node.js release schedule](https://github.com/nodejs/Release), [Vercel Node.js 26 support](https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel), [React versions](https://react.dev/versions), [Vite releases](https://vite.dev/releases), [React Router changelog](https://reactrouter.com/changelog), [Tailwind CSS releases](https://tailwindcss.com/blog).

## 4.2 Prerequisites on the computer

- Node.js 26.x Active LTS and npm.
- Git and access to the project GitHub repository.
- Docker Desktop running for local Supabase development.
- Supabase account and a development project containing synthetic data only.
- Vercel account for deployment and Vercel CLI 65.8.0 or later for Node.js 26 deployments.
- Chrome or Edge for desktop testing and a mobile browser for responsive testing.
- Supabase CLI installed and available in the terminal.

## 4.3 Commands

| Purpose | Command |
|---|---|
| Install dependencies | `npm install` |
| Start local Supabase | `npx supabase start` |
| Reset database and apply migrations/seed | `npx supabase db reset` |
| Start web app | `npm run dev` |
| Unit/component tests | `npm test` |
| Database and RLS tests | `npx supabase test db` |
| End-to-end tests | `npx playwright test` |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| Full check | `npm run check` |
| Build | `npm run build` |
| Run Edge Function locally | `npx supabase functions serve admin-manage-staff` |
| Deploy Edge Function | `npx supabase functions deploy admin-manage-staff` |
| Deploy web app | `vercel --prod` |

`npm run check` must run lint, type check, unit/component tests and database tests. Playwright runs separately because the app and local Supabase must be available. Exact script definitions are created in Phase 1 and documented in `package.json`. The Vercel deployment command must be run with Vercel CLI 65.8.0 or later when using the Node.js 26 build runtime.

# 5. Folder structure

```text
branchpulse/
  src/
    app/                 Router, session provider and access guards
    pages/               S1-S11 route-level screens
    components/
      common/             Buttons, fields, badges, tables, banners and state views
      incidents/          Incident cards, filters and history timeline
      assets/             Asset summary and asset incident history
      dashboard/          Summary cards and repeat-fault list
    features/
      auth/                Login and profile access
      branches/            Branch operations
      assets/              Asset operations
      incidents/           Incident operations and rules
      technician/          Worklist and service activity
      reports/             Dashboard and report queries
    lib/
      supabase.ts          Browser Supabase client using public variables only
      permissions.ts       UI permission helpers; never the security boundary
      dates.ts             Africa/Johannesburg date display helpers
      messages.ts          User-facing messages MSG1-MSG10 from the PRD
      validation/          Pure validation functions
    theme/
      tokens.css           Tailwind v4 @theme design tokens used by components
    types/                 Shared application types
  supabase/
    migrations/            Ordered SQL schema, policies and functions
    functions/
      admin-manage-staff/  Trusted staff identity creation/deactivation endpoint
    tests/                 pgTAP database and permission tests
    seed.sql               Synthetic demo data
  tests/
    unit/                  Pure business-rule tests
    components/            Component and screen-state tests
    integration/           Supabase operation tests
    e2e/                   Playwright role journeys
    manual/                Browser compatibility and seed-data privacy checklists
    architecture/          Maintainability and structure review checklist
  docs/
    PRD.md
    designs/               S1.png-S11.png, M1.png-M6.png and style-guide.png
  .env.example
  .gitignore
  package.json
  playwright.config.ts
  vite.config.ts
  README.md
  IMPLEMENTATION_PLAN.md
```

Rule: a new folder may only be created if it is added to this section first. The design exports are planned assets and must not be represented as complete until supplied and reviewed.

# 6. Environment variables and secrets

| Variable/file | Purpose | Classification | Used by |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | Public configuration | Browser app |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/publishable key; safe only with RLS enabled | Public client key | Browser app |
| `SUPABASE_URL` | Local Supabase URL for scripts and tests | Non-secret configuration | Seed and integration scripts |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged Supabase key | Secret | Supabase Edge Function secrets and trusted local seed/test scripts only; never `src/` |
| `E2E_BASE_URL` | Base URL used by Playwright | Non-secret configuration | E2E tests |
| `PLAYWRIGHT_TEST_EMAIL` | Synthetic test account email | Test configuration | E2E tests |
| `PLAYWRIGHT_TEST_PASSWORD` | Password for synthetic test account | Secret | E2E tests only |

`.env.example` contains placeholder values only:

```dotenv
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=replace-with-local-anon-key
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=replace-with-server-only-service-role-key
E2E_BASE_URL=http://127.0.0.1:5173
PLAYWRIGHT_TEST_EMAIL=branch.reporter@example.test
PLAYWRIGHT_TEST_PASSWORD=replace-with-test-only-password
```

Rules:

- Real values belong in ignored `.env` files. `.gitignore` must ignore `.env*` and then allow `!.env.example`.
- Only variables beginning with `VITE_` may be read by files in `src/`.
- `SUPABASE_SERVICE_ROLE_KEY` must never be imported into frontend code, included in a browser bundle, logged or committed. In hosted use it is configured only as a Supabase Edge Function secret; local scripts read it from an ignored `.env` file.
- Seed accounts must use fictional email addresses and test-only passwords.
- If a new environment variable is required, add it to this section and `.env.example` before using it.

# 7. Design system and screens

## 7.1 Proposed design tokens

These tokens are proposed because the supplied examples do not include BranchPulse screen designs. They must be confirmed against the final design exports before implementation. Store the tokens in `src/theme/tokens.css` using Tailwind CSS v4 CSS-first `@theme` variables, and import Tailwind through the `@tailwindcss/vite` plugin.

| Token | Proposed value |
|---|---|
| Primary | `#17324D` deep navy |
| Accent | `#167C80` muted teal |
| Background | `#F4F6F8` |
| Surface | `#FFFFFF` |
| Primary text | `#17212B` |
| Secondary text | `#64748B` |
| Border | `#D9E1E8` |
| Error | `#B42318` |
| Warning | `#A15C07` |
| Success | `#237A50` |
| Font | Inter or system sans-serif |
| Heading | 22px bold |
| Section heading | 18px semibold |
| Body | 15-16px regular |
| Supporting text | 13px, never below 12px |
| Base spacing | 8px scale |
| Screen padding | 16px mobile; 24px desktop |
| Card radius | 12px |
| Input radius | 8px |
| Minimum touch target | 44px |

## 7.2 Shared components

| Component | Purpose |
|---|---|
| AppShell | Shared navigation, page header and content area. |
| Button | Primary, secondary, danger and disabled action states. |
| TextField | Labelled text input with help and validation states. |
| SelectField | Accessible selection control for branch, asset, category, priority and assignee. |
| StatusBadge | Text and visual indicator for New, Assigned, In Progress and Resolved. |
| PriorityBadge | Text and visual indicator for Low, Medium, High and Urgent. |
| DataTable | Responsive incident, branch and asset listing. |
| EmptyState | Explains when a permitted list has no records. |
| LoadingState | Consistent loading feedback. |
| ErrorBanner | Clear error and retry action. |
| OfflineBanner | Explains that the service cannot be reached; no offline writes are queued. |
| ConfirmDialog | Confirms assignment, deactivation or resolution actions. |
| IncidentTimeline | Shows notes and status history in time order. |
| SummaryCard | Shows one dashboard metric with a text label. |

## 7.3 Screens and modals

Design exports are planned under `docs/designs/`. Until the exports are created and reviewed, the screen details below are requirements, not evidence of completed visual design.

| ID | Screen / design file | Route | Who can open it | Phase | Required states |
|---|---|---|---|---|---|
| S1 | Sign in / `S1.png` | `/login` | Public | 1 placeholder, 3 complete | Normal, Loading, Error, Offline; success redirects to the role landing screen |
| S2 | Operations overview / `S2.png` | `/dashboard` | Administrator, Support Coordinator | 7 | Normal, Loading, Error, Offline, Empty |
| S3 | Incident register / `S3.png` | `/incidents` | Admin/Coordinator all; Reporter own branch; Technician assigned only | 5 | Normal, Loading, Empty, Error, Offline |
| S4 | Incident detail / `S4.png` | `/incidents/:id` | Admin/Coordinator; assigned Technician; same-branch Reporter read-only | 5 | Normal, Loading, Error, Offline, Success |
| S5 | Report incident / `S5.png` | `/incidents/new` | Branch Reporter | 5 | Normal, Loading, Error, Offline, Success |
| S6 | Asset register / `S6.png` | `/assets` | Administrator, Support Coordinator | 4 | Normal, Loading, Empty, Error, Offline |
| S7 | Asset detail / `S7.png` | `/assets/:id` | Admin/Coordinator; relevant same-branch Reporter and assigned Technician read-only | 4 | Normal, Loading, Error, Offline, Empty |
| S8 | Branch management / `S8.png` | `/branches` | Administrator | 4 | Normal, Loading, Empty, Error, Offline, Success |
| S9 | Technician worklist / `S9.png` | `/my-work` | Technician | 6 | Normal, Loading, Empty, Error, Offline |
| S10 | Reports and Repeat Fault Watch / `S10.png` | `/reports` | Administrator, Support Coordinator | 7 | Normal, Loading, Empty, Error, Offline |
| S11 | Staff management / `S11.png` | `/staff` | Administrator | 3 | Normal, Loading, Empty, Error, Offline, Success |
| M1 | Assign Technician / `M1.png` | S4 modal | Administrator, Support Coordinator | 5 | Normal, Loading, Error, Success |
| M2 | Branch form / `M2.png` | S8 modal | Administrator | 4 | Normal, Loading, Error, Success |
| M3 | Asset form / `M3.png` | S6 modal | Administrator, Support Coordinator | 4 | Normal, Loading, Error, Success |
| M4 | Log service activity / `M4.png` | S4/S9 modal | Assigned Technician | 6 | Normal, Loading, Error, Success |
| M5 | Staff account form / `M5.png` | S11 modal | Administrator | 3 | Normal, Loading, Error, Success |
| M6 | Confirm resolution / `M6.png` | S4/S9 modal | Assigned Technician | 6 | Normal, Loading, Error, Success |

# 8. Data model and database

## 8.1 Tables

All tables use UUID primary keys and timezone-aware timestamps where applicable. The schema is implemented through ordered Supabase migrations.

### `profiles`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key; references `auth.users.id` with deletion restricted while a profile or related history exists. |
| `full_name` | text | Required and non-empty. |
| `email` | text | Required; unique; matches authenticated identity. |
| `role` | text | One of `administrator`, `support_coordinator`, `technician`, `branch_reporter`. |
| `branch_id` | UUID | Nullable; CHECK requires a non-null active branch for Branch Reporter; FK to branches. |
| `is_active` | boolean | Required; default true. |
| `created_at` | timestamptz | Required; default now(). |

### `branches`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key. |
| `store_code` | text | Required and unique; trim surrounding spaces and convert to uppercase before uniqueness validation. |
| `name` | text | Required and non-empty. |
| `province` | text | Required and non-empty. |
| `city` | text | Required and non-empty. |
| `address` | text | Optional. |
| `is_active` | boolean | Required; default true. |
| `created_at`, `updated_at` | timestamptz | Required. |

### `assets`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key. |
| `branch_id` | UUID | Required FK to branches. |
| `asset_tag` | text | Required and unique within the MVP organisation. |
| `display_name` | text | Required and non-empty. |
| `category` | text | `scanner`, `printer`, `pos_terminal`, `workstation`, `network_device`, `other` as defined in PRD 9.2. |
| `manufacturer`, `model` | text | Optional. |
| `serial_number` | text | Optional. |
| `installation_date` | date | Optional; no default. |
| `is_active` | boolean | Required; default true. |
| `created_at`, `updated_at` | timestamptz | Required. |

### `incidents`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key. |
| `branch_id` | UUID | Required FK to branches. |
| `asset_id` | UUID | Required FK to assets; asset must belong to branch_id. |
| `reported_by` | UUID | Required FK to profiles. |
| `assigned_to` | UUID | Nullable FK to profiles; if set, role must be Technician and account active. |
| `title` | text | Required and non-empty. |
| `description` | text | Required and non-empty. |
| `category` | text | `network`, `printer`, `scanner`, `pos`, `workstation`, `software`, `other` as defined in PRD 9.2. |
| `priority` | text | `low`, `medium`, `high`, `urgent`; default `medium`. |
| `status` | text | `new`, `assigned`, `in_progress`, `resolved`; default `new`. |
| `resolution_summary` | text | Nullable until resolved; minimum 10 characters when status is resolved. |
| `created_at`, `updated_at` | timestamptz | Required. |

### `incident_updates`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key. |
| `incident_id` | UUID | Required FK to incidents. |
| `author_id` | UUID | Required FK to profiles. |
| `note` | text | Required and non-empty. |
| `created_at` | timestamptz | Required; immutable after insert. |

### `technician_visits`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key. |
| `incident_id` | UUID | Required FK to incidents. |
| `technician_id` | UUID | Required FK to profiles; must be currently assigned Technician. |
| `activity_type` | text | `on_site` or `remote` as defined in PRD 9.2. |
| `activity_date` | timestamptz | Required. |
| `outcome` | text | Required and non-empty. |
| `time_spent_minutes` | integer | Required; positive whole number. |
| `created_at` | timestamptz | Required. |

### `incident_status_history`

| Column | Type | Rules |
|---|---|---|
| `id` | UUID | Primary key. |
| `incident_id` | UUID | Required FK to incidents. |
| `old_status` | text | Nullable only for initial insert. |
| `new_status` | text | Required. |
| `changed_by` | UUID | Required FK to profiles for user-driven changes. |
| `changed_at` | timestamptz | Required; default now(). |

## 8.2 Relationships and delete behaviour

- One Branch has many Assets.
- One Branch has many Incidents.
- One Asset has many Incidents.
- One Profile can report many Incidents.
- One Technician can be assigned many Incidents.
- One Incident has many IncidentUpdates, TechnicianVisits and IncidentStatusHistory rows.
- Foreign keys must restrict deletion where deletion would break incident history. Branches, Assets and Profiles are deactivated, not deleted, through the application.
- An Incident cannot be deleted through application operations.

## 8.3 Incident status changes

| Current status | Next status | Who may perform it | Required data |
|---|---|---|---|
| New | Assigned | Administrator or Support Coordinator | Active Technician assignee |
| Assigned | Assigned | Administrator or Support Coordinator | New active Technician assignee |
| Assigned | In Progress | Currently assigned Technician | None |
| In Progress | Resolved | Currently assigned Technician | Resolution summary of at least 10 characters |

All other transitions are rejected. Reopening a Resolved incident is deferred. Each valid transition writes a row to `incident_status_history` in the same database transaction.

## 8.4 Indexes

Create indexes for:

- `profiles.role`, `profiles.branch_id` and `profiles.is_active`.
- `branches.store_code` (unique index).
- `assets.branch_id`, `assets.asset_tag` (unique index) and `assets.is_active`.
- `incidents.status`, `incidents.priority`, `incidents.branch_id`, `incidents.asset_id`, `incidents.assigned_to` and `incidents.created_at`.
- `incident_updates.incident_id` and `technician_visits.incident_id`.
- `incident_status_history.incident_id` and `incident_status_history.changed_at`.

## 8.5 Functions, views and triggers

- `current_profile_id()` returns the authenticated profile identifier for policy checks.
- `current_user_role()` returns the active profile role.
- `assign_incident(incident_id, technician_id)` verifies the caller, active Technician and incident before assigning and setting status to Assigned.
- `admin-manage-staff` Edge Function verifies the caller JWT and active Administrator profile before creating a staff Auth identity and corresponding Profile; it never returns or exposes the service-role key.
- `change_incident_status(incident_id, next_status, resolution_summary)` verifies the current assignee and the permitted transition.
- A trigger on incident status changes inserts an immutable `incident_status_history` record.
- A timestamp trigger updates `updated_at` on Branch, Asset and Incident updates.
- `asset_repeat_faults` view groups incident counts by asset for the previous rolling 30 days inclusive of the current query instant and returns assets with a count of at least three.
- No scheduled job is required. Repeat Fault Watch is calculated from current incident data when queried.

## 8.6 Migrations (in order)

1. Create enum/check values and the `profiles` and `branches` tables.
2. Create `assets` and `incidents` with foreign keys and check constraints.
3. Create `incident_updates`, `technician_visits` and `incident_status_history`.
4. Add indexes and timestamp/status triggers.
5. Add database functions for assignment and status changes.
6. Add RLS policies for every table and test both allowed and denied access.
7. Create the repeat-fault view and seed-data support.

## 8.7 Seed data and test accounts

Seed data must be synthetic and repeatable. Use one fictional organisation, three fictional branches, six to nine assets, and test users for Administrator, Support Coordinator, Technician and Branch Reporter. Add incidents in New, Assigned, In Progress and Resolved states. At least one asset must have three incidents inside the rolling 30-day test window; another must have two. Include a second branch with records to test branch isolation. Test passwords are stored only in ignored local environment files.

# 9. Security and permissions

RLS is mandatory for every table exposed through the Supabase client. UI route guards improve usability but do not replace RLS.

| Security ID | Permission rule | Enforced by |
|---|---|---|
| SEC1 | Only authenticated active profiles can read protected application data. | RLS helper and policies on all protected tables. |
| SEC2 | Users read their own profile; Administrators may read all profiles. | `profiles` select policy. |
| SEC3 | Branch Reporters read their own branch, its assets and its incidents only. | Branch-scoped RLS policies. |
| SEC4 | Technicians read incidents assigned to them and linked asset/branch information only. | Assignee-scoped RLS policies. |
| SEC5 | Administrators and Support Coordinators can read organisation-wide operational records. | Role-based RLS policies. |
| SEC6 | Only Administrators create/update/deactivate Branches and staff profiles. | RLS write policies and controlled profile creation. |
| SEC7 | Only Administrators and Support Coordinators create/update/deactivate Assets. | RLS write policies. |
| SEC8 | Only Administrators and Support Coordinators assign incidents to active Technicians. | `assign_incident` function. |
| SEC9 | Only the currently assigned Technician changes incident status. | `change_incident_status` function. |
| SEC10 | Only the assigned Technician adds updates and visit records to an active incident. | RLS insert policies. |
| SEC11 | Status history can only be inserted by its trigger and cannot be edited/deleted by application users. | Trigger ownership and RLS deny policies. |
| SEC12 | Administrators and Support Coordinators may update permitted incident fields, such as priority; no application role can delete an Incident. | RLS update policy and no delete policy. |
| SEC13 | The service-role key is available only to the server-side `admin-manage-staff` Edge Function and trusted seed/test scripts; it is never exposed to frontend code. | Supabase Edge Function secrets, ignored local environment files and a browser-bundle secret scan. |

For every SEC rule, write one allow test and one deny test. Deny tests must use a signed-in identity that deliberately attempts an unauthorised operation.

# 10. Backend operations

| Operation ID | Operation | Who may call it | Main checks |
|---|---|---|---|
| OP1 | Load current profile | Authenticated user | Active profile exists; return own profile only. |
| OP2 | Create staff account | Administrator through `admin-manage-staff` Edge Function | Verify caller JWT and active Administrator role; approved role; Branch Reporter has active branch; no public self-signup. |
| OP3 | Deactivate staff account | Administrator | Preserve historical rows; do not delete the Auth identity or historical records. |
| OP4 | List branches | Administrator/Coordinator; Reporter gets own branch only | Apply role scope and active filter where appropriate. |
| OP5 | Create/update/deactivate branch | Administrator | Unique store code and required fields. |
| OP6 | List assets | Admin/Coordinator; Reporter own branch; Technician linked asset only | Enforce branch/assignee scope. |
| OP7 | Create/update/deactivate asset | Administrator/Coordinator | Active branch; unique asset tag; preserve history. |
| OP8 | Create incident | Branch Reporter | Active own-branch asset; valid fields; status New. |
| OP9 | List incidents | By role | Admin/Coordinator all; Reporter own branch; Technician assigned only. |
| OP10 | Read incident detail | By role | Verify access to the incident and related records. |
| OP11 | Update incident priority | Administrator/Coordinator | Approved priority values. |
| OP12 | Assign/reassign incident | Administrator/Coordinator | Active Technician; valid incident; call `assign_incident`. |
| OP13 | Add incident update | Assigned Technician | Incident is assigned to caller; authorisation and note length. |
| OP14 | Change incident status | Assigned Technician | Valid transition and resolution summary; call `change_incident_status`. |
| OP15 | Add technician visit | Assigned Technician | Incident In Progress; activity type, outcome and time range valid. |
| OP16 | Load dashboard totals | Administrator/Coordinator | Aggregate records visible to the caller. |
| OP17 | Load Repeat Fault Watch | Administrator/Coordinator | Rolling 30-day window, threshold >= 3. |
| OP18 | Load filtered report | Administrator/Coordinator | Date, branch, category and status filters; server-side scope. |

# 11. Navigation rules

- After successful sign-in, Administrators and Support Coordinators land on S2.
- Branch Reporters land on S3 and see only their branch's incidents; the Report Incident action opens S5.
- Technicians land on S9 and see only assigned incidents.
- Selecting an incident opens S4 only after the database confirms access.
- Selecting an asset opens S7 only for users permitted to read that asset.
- The navigation menu shows only links relevant to the current role, but database policies remain authoritative.
- An unauthenticated user who requests a protected route is redirected to S1.
- An authenticated user who requests a forbidden route is redirected to their permitted landing screen and receives an access-denied message.
- A deactivated profile is signed out and cannot continue using protected screens.

# 12. Testing strategy

## 12.1 The TDD cycle (every task, every phase)

1. Red: write the test for the requirement and run it. It must fail for the expected reason.
2. Green: write the smallest implementation that makes the test pass, then run all tests from earlier phases.
3. Refactor: clean names, remove duplication and move code to its planned folder. Run the tests again.
4. Do not start the next task until the current test is green and the refactor is complete.

## 12.2 Test levels

| Level | Tool | What it covers |
|---|---|---|
| Unit | Vitest | Validation helpers, status transitions, repeat-fault threshold and date logic. |
| Component | React Testing Library | Forms, badges, tables, empty/loading/error/offline states and role-aware navigation. |
| Database | pgTAP through Supabase CLI | Constraints, functions, triggers, RLS and allow/deny permissions. |
| Integration | Vitest and Supabase client | Application operations against local Supabase using test identities. |
| End-to-end | Playwright | Reporter, Coordinator, Technician and Administrator workflows. |
| Manual | Browser/device checklist | Responsive layout, usability, state feedback and demo walkthrough. |

## 12.3 Test ID conventions

- User stories: `T-US1-1`, `T-US1-2` through the acceptance tests in PRD Section 13.
- Business rules: `T-BR1-1` through `T-BR15-1`.
- Security: `T-SEC1-A` and `T-SEC1-D` through `T-SEC13-A` and `T-SEC13-D`.
- Database: `T-DB-1` onward.
- Components: `T-C-1` onward.
- Screens: `T-S1-1` onward, using the screen ID in the test name.
- Edge cases: `T-EDGE1` through `T-EDGE6`.
- End-to-end: `T-E2E-1` onward.
- Release: `T-REL-1` onward.
- User-facing messages: `T-MSG1` through `T-MSG10`; each test checks the exact message in PRD Section 8.2.

## 12.4 Test data rules

- Use synthetic branch names, assets, staff identities and incident descriptions only.
- Tests must be independent and repeatable.
- Database tests start from a clean local reset and seed dataset.
- Permission tests use separate identities for each of the four roles.
- Never use a real retailer's store code, employee email, asset serial number, network address or password.
- Dates in repeat-fault tests must be fixed or injected so that the 30-day boundary is deterministic.

## 12.5 Coverage rules

- Every US acceptance criterion in PRD Section 13 is covered by an automated or documented manual test.
- Every BR rule has at least one test.
- Every SEC permission has an allow and a deny test.
- Every required screen state is tested. Each approved message MSG1-MSG10 has its own exact-string test, T-MSG1 through T-MSG10.
- Every edge case in PRD Section 13.4 is tested.
- Aim for at least 80% line coverage for pure business-rule functions. This target does not replace specific acceptance and permission tests.

# 13. Phases

## 13.0 Phase overview

| Phase | Name | Features | Screens | Main tests |
|---|---|---|---|---|
| 1 | Foundation | Setup only | S1 placeholder | T-SETUP, T-C, T-S1 |
| 2 | Data and security | Complete schema and permissions | None | T-DB, T-BR, T-SEC |
| 3 | Staff accounts and role access | F1 | S1, S11, M5 | T-US1, T-US2, T-US13 |
| 4 | Branch and asset register | F2 | S6-S8, M2-M3 | T-US3, T-US4, T-BR1, T-BR2 |
| 5 | Incident reporting and coordination | F3 | S3-S5, M1 | T-US5, T-US6, T-US7 |
| 6 | Technician workflow | F4 | S4, S9, M4, M6 | T-US8, T-US9 |
| 7 | Dashboard and Repeat Fault Watch | F5 | S2, S10 | T-US10, T-US11, T-US12 |
| 8 | Hardening | All | All | T-EDGE, T-NFR, T-E2E |
| 9 | Release | All | All | T-REL, full suite |

Every phase follows the same five steps in order: failing tests, backend, frontend, refactor and full check, manual checks. Each phase ends with a Definition of Done, commit message and STOP instruction.

## Phase 1: Foundation

**Goal:** Create the Vite/React/TypeScript project, quality scripts, folder structure, theme tokens, environment template and a simple S1 sign-in shell. No authentication integration is completed in this phase.

**Covers:** Setup only.  
**Starts when:** The mentor has reviewed Section 18 and the human says `Start Phase 1`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-SETUP-1 | Unit | `tests/unit/setup.test.ts` | Test runner starts and reads the project configuration. |
| T-C-1 | Component | `tests/components/button.test.tsx` | Disabled Button cannot be activated and exposes a disabled state. |
| T-S1-1 | Component | `tests/screens/login.test.tsx` | S1 renders the sign-in fields and primary action shell. |
| T-MSG1 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG1 exactly. |
| T-MSG2 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG2 exactly. |
| T-MSG3 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG3 exactly. |
| T-MSG4 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG4 exactly. |
| T-MSG5 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG5 exactly. |
| T-MSG6 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG6 exactly. |
| T-MSG7 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG7 exactly. |
| T-MSG8 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG8 exactly. |
| T-MSG9 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG9 exactly. |
| T-MSG10 | Unit | `tests/unit/messages.test.ts` | Message catalogue value matches PRD MSG10 exactly. |

### Step 2 - Backend

- Initialise the repository, Vite, TypeScript and the Supabase project configuration.
- Add `.env.example` and `.gitignore` before any real keys are created.
- Set `engines.node` to `26.x` in `package.json` so the local and Vercel build runtimes agree.
- Add a documented `npm run check` script.
- Do not create application tables or use the service-role key in the browser.

### Step 3 - Frontend

- Create the folder structure in Section 5.
- Add Tailwind CSS 4 through `@tailwindcss/vite` and create `src/theme/tokens.css` using the tokens in Section 7.1.
- Create AppShell and the common Button, TextField, LoadingState and ErrorBanner components.
- Build S1 as a visual placeholder using synthetic content. Keep message handling centralised for the PRD message IDs MSG1-MSG10.
- Add `src/lib/messages.ts` with the exact PRD text and pass T-MSG1 through T-MSG10.

### Step 4 - Refactor and full check

- Refactor without changing behaviour.
- Run `npm run check` and confirm all current tests pass.
- Confirm `.env*` is ignored and `.env.example` remains tracked.

### Step 5 - Manual checks

- Start the app locally and open S1 at mobile and desktop widths.
- Confirm no secret key appears in `src/`, browser developer tools or Git history.
- Confirm keyboard focus is visible on the form fields and button.

**Definition of Done**

- [ ] T-SETUP-1, T-C-1 and T-S1-1 pass.
- [ ] T-MSG1 through T-MSG10 pass with exact PRD wording.
- [ ] Project scripts and folder structure exist.
- [ ] S1 placeholder loads at mobile and desktop sizes.
- [ ] `.env.example` contains placeholders only.
- [ ] Progress log is updated.

**Commit:** `Phase 1: foundation and project setup`

**STOP. Wait for `Start Phase 2`.**

## Phase 2: Data and security

**Goal:** Create the complete database schema, constraints, functions, triggers, repeat-fault view and all RLS policies before feature screens depend on them.

**Covers:** BR1-BR15 and SEC1-SEC13.  
**Starts when:** Phase 1 is complete and the human says `Start Phase 2`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-DB-1 | Database | `supabase/tests/schema_test.sql` | All seven required tables and foreign keys exist. |
| T-BR1-1 | Database | `supabase/tests/business_rules_test.sql` | Duplicate or blank branch store code is rejected. |
| T-BR2-1 | Database | `supabase/tests/business_rules_test.sql` | Blank/duplicate asset tag or missing branch is rejected. |
| T-BR3-1 | Database | `supabase/tests/business_rules_test.sql` | Incident cannot reference an asset from another branch. |
| T-BR4-1 | Database | `supabase/tests/business_rules_test.sql` | New incident receives status New and only approved status values are accepted. |
| T-BR5-1 | Database | `supabase/tests/business_rules_test.sql` | Only active Technician can be assigned by permitted role. |
| T-BR6-1 | Database | `supabase/tests/business_rules_test.sql` | Invalid status transition is rejected. |
| T-BR7-1 | Database | `supabase/tests/business_rules_test.sql` | Resolved status requires at least 10 characters in resolution summary. |
| T-BR8-1 | Database | `supabase/tests/business_rules_test.sql` | Status change inserts immutable history row. |
| T-BR9-1 | Database | `supabase/tests/business_rules_test.sql` | Reporter cannot create incident for another branch. |
| T-BR10-1 | Database | `supabase/tests/business_rules_test.sql` | Reporter read scope is limited to own branch. |
| T-BR11-1 | Database | `supabase/tests/business_rules_test.sql` | Technician read scope is limited to assigned incidents. |
| T-BR12-1 | Database | `supabase/tests/business_rules_test.sql` | Technician visit is accepted only for assigned In Progress incident. |
| T-BR13-1 | Database | `supabase/tests/repeat_fault_test.sql` | Three incidents in the rolling 30-day window flag an asset; two do not. |
| T-BR14-1 | Database | `supabase/tests/business_rules_test.sql` | Incident and status history cannot be deleted. |
| T-BR15-1 | Unit/Database | `tests/unit/dates.test.ts` | Timestamps display in Africa/Johannesburg without changing stored instant. |
| T-SEC1-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Active authenticated profile can read permitted application data. |
| T-SEC1-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: an unauthenticated request attempts to read a protected record. |
| T-SEC2-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: User reads own profile; Administrator reads all profiles. |
| T-SEC2-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Branch Reporter attempts to read another staff member's profile. |
| T-SEC3-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Branch Reporter reads own branch records. |
| T-SEC3-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Branch Reporter assigned to Branch A attempts to read a Branch B record. |
| T-SEC4-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Technician reads incidents assigned to them and linked data. |
| T-SEC4-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: Technician A attempts to read an incident assigned to Technician B. |
| T-SEC5-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Administrator/Coordinator reads organisation-wide operational records. |
| T-SEC5-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Branch Reporter or Technician attempts an organisation-wide incident query. |
| T-SEC6-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Administrator creates/updates branches and manages staff profiles. |
| T-SEC6-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Support Coordinator attempts to create or update a Branch or staff profile. |
| T-SEC7-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Administrator/Coordinator creates/updates assets. |
| T-SEC7-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Branch Reporter or Technician attempts to create or update an Asset. |
| T-SEC8-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Administrator/Coordinator assigns an incident to an active Technician. |
| T-SEC8-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Branch Reporter or Technician attempts to assign an Incident. |
| T-SEC9-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Currently assigned Technician changes incident status through the function. |
| T-SEC9-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a Coordinator or unassigned Technician attempts to change Incident status. |
| T-SEC10-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Assigned Technician adds an update or service activity to an eligible incident. |
| T-SEC10-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: a user other than the assigned Technician attempts to add an update or service activity. |
| T-SEC11-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Status-history trigger inserts a row and application users cannot edit it. |
| T-SEC11-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: an application user attempts to update or delete a status-history row directly. |
| T-SEC12-A | Database/Integration | `supabase/tests/rls_test.sql` | Allow: Administrator/Coordinator updates an allowed incident field such as priority. |
| T-SEC12-D | Database/Integration | `supabase/tests/rls_test.sql` | Deny: any application role attempts to delete an Incident. |
| T-SEC13-A | Static/Security | `tests/unit/secrets.test.ts` | Allow: the staff Edge Function reads the privileged key only from server-side environment configuration. |
| T-SEC13-D | Static/Security | `tests/unit/secrets.test.ts` | Deny: the service-role key is found in src/ or the built browser bundle. |

### Step 2 - Backend

- Create all tables and constraints in Section 8.1 using ordered migrations.
- Create indexes, `updated_at` triggers, `assign_incident` and `change_incident_status` functions.
- Add the immutable status-history trigger and `asset_repeat_faults` view.
- Enable RLS on every table exposed to the client.
- Add policies for SEC1-SEC13 and verify each using separate seeded identities.
- Add the fictional seed dataset only after policies and schema are in place.

### Step 3 - Frontend

- No feature screens are built in this phase.
- Add TypeScript types generated from or aligned with the database schema.
- Add a small database connection/status utility for later phases.

### Step 4 - Refactor and full check

- Review migration ordering and remove duplicate policy logic.
- Run `npx supabase db reset` and `npx supabase test db`.
- Run `npm run check` and confirm the database permission tests pass.

### Step 5 - Manual checks

- Inspect the local schema and confirm all tables have RLS enabled.
- Sign in as each seeded role and attempt one permitted and one denied operation for each security boundary.
- Confirm a Reporter from Branch A cannot read Branch B incidents or assets.
- Confirm the service-role key is absent from frontend files and Git.

**Definition of Done**

- [ ] All seven tables, constraints, indexes and functions exist.
- [ ] BR1-BR15 tests pass.
- [ ] SEC1-SEC13 each have passing allow and deny tests.
- [ ] Repeat Fault Watch threshold is proven by deterministic database tests.
- [ ] No browser operation depends on the service-role key.
- [ ] Progress log is updated.

**Commit:** `Phase 2: database schema and row-level security`

**STOP. Wait for `Start Phase 3`.**

## Phase 3: Staff accounts and role access (F1)

**Goal:** Complete staff sign-in, profile loading, role-based routing and Administrator staff management.

**Covers:** F1, US1, US2 and US13.  
**Starts when:** Phase 2 is complete and the human says `Start Phase 3`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-US1-1 | Integration | `tests/integration/auth.test.ts` | Active test user signs in and profile loads. |
| T-US1-2 | Integration | `tests/integration/auth.test.ts` | Invalid credentials do not create an authenticated session. |
| T-US1-3 | E2E/Integration | `tests/e2e/public-registration.spec.ts` | Public visitor cannot access a sign-up route or create a staff account. |
| T-US2-1 | Component | `tests/screens/navigation.test.tsx` | Each role receives its permitted landing route. |
| T-US2-2 | E2E | `tests/e2e/role-access.spec.ts` | Forbidden route is denied or redirected. |
| T-US13-1 | Integration | `tests/integration/staff.test.ts` | Administrator creates staff account with approved role. |
| T-US13-2 | Database/E2E | `tests/integration/staff.test.ts` | Deactivated staff member cannot read protected records. |

### Step 2 - Backend

- Integrate Supabase Auth using the public client key.
- Disable public self-sign-up in the Supabase Auth configuration; staff accounts are created only by the approved Administrator operation.
- Add profile lookup and role-aware session handling.
- Implement controlled staff creation and deactivation operations for Administrators.
- Ensure deactivated profiles are denied by database policies, not just signed out in the UI.

### Step 3 - Frontend

- Complete S1 sign-in states.
- Add the role-aware AppShell and route guards.
- Build S11 Staff Management and M5 Staff Account Form.
- Display exact validation and access-denied messages in one message module.

### Step 4 - Refactor and full check

- Refactor session handling and route checks into shared utilities.
- Run `npm run check`, database tests and the role-access E2E test. Re-run the SEC1-SEC13 allow/deny suite created in Phase 2 as regression coverage.
- Confirm the service-role key is not bundled in the app.

### Step 5 - Manual checks

- Sign in as all four roles and confirm the landing screen.
- Attempt to open S11 as a non-Administrator.
- Deactivate a test user and confirm protected access is rejected.

**Definition of Done**

- [ ] T-US1, T-US2 and T-US13 tests pass.
- [ ] SEC1, SEC2 and SEC6 tests pass.
- [ ] S1, S11 and M5 show all required states.
- [ ] Deactivated profiles cannot access protected data.
- [ ] Progress log is updated.

**Commit:** `Phase 3: staff authentication and role access`

**STOP. Wait for `Start Phase 4`.**

## Phase 4: Branch and asset register (F2)

**Goal:** Complete branch management and asset registration while preserving branch and asset history.

**Covers:** F2, US3, US4, BR1 and BR2.  
**Starts when:** Phase 3 is complete and the human says `Start Phase 4`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-US3-1 | Integration | `tests/integration/branches.test.ts` | Administrator creates and updates a branch. |
| T-US3-2 | Database | `supabase/tests/business_rules_test.sql` | Duplicate or blank store code is rejected. |
| T-US4-1 | Integration | `tests/integration/assets.test.ts` | Admin/Coordinator creates asset under active branch. |
| T-US4-2 | Database | `supabase/tests/business_rules_test.sql` | Duplicate or blank asset tag is rejected. |
| T-US4-3 | Integration/Component | `tests/integration/assets.test.ts` | Optional installation date is saved and shown on S7 when supplied. |
| T-BR1-1 | Database | `supabase/tests/business_rules_test.sql` | Branch uniqueness and required fields hold. |
| T-BR2-1 | Database | `supabase/tests/business_rules_test.sql` | Asset branch and asset-tag constraints hold. |

### Step 2 - Backend

- Implement OP4-OP7 using Supabase queries under RLS.
- Add validation for store code, branch state and asset tag.
- Persist optional asset installation date without requiring it for asset creation.
- Add deactivation operations that preserve historical records.

### Step 3 - Frontend

- Build S8 Branch Management and M2 Branch Form.
- Build S6 Asset Register, S7 Asset Detail and M3 Asset Form, including an optional installation-date field.
- Add empty, loading, error, offline and success states.

### Step 4 - Refactor and full check

- Refactor form validation into pure functions.
- Run `npm run check`, the branch/asset integration tests and the SEC6-SEC7 regression tests from Phase 2.
- Confirm list filters do not bypass RLS.

### Step 5 - Manual checks

- Create a fictional branch and asset.
- Attempt to reuse a store code and asset tag.
- Deactivate an asset linked to an existing incident and confirm the incident remains available to permitted users.

**Definition of Done**

- [ ] T-US3, T-US4, T-BR1 and T-BR2 pass.
- [ ] S6-S8 and M2-M3 show required states.
- [ ] Branch and asset deactivation preserve linked incident history.
- [ ] SEC6 and SEC7 tests pass.
- [ ] Progress log is updated.

**Commit:** `Phase 4: branch and asset register`

**STOP. Wait for `Start Phase 5`.**

## Phase 5: Incident reporting and coordination (F3)

**Goal:** Allow Branch Reporters to create incidents and Support Coordinators to review, prioritise and assign them.

**Covers:** F3, US5-US7, BR3-BR5 and BR9-BR10.  
**Starts when:** Phase 4 is complete and the human says `Start Phase 5`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-US5-1 | Integration | `tests/integration/incidents.test.ts` | Reporter creates incident for active own-branch asset. |
| T-US5-2 | Database | `supabase/tests/business_rules_test.sql` | Incident cannot use an asset from another branch. |
| T-US6-1 | Database/E2E | `tests/e2e/reporter-incident.spec.ts` | Reporter sees own branch incidents only. |
| T-US7-1 | Integration | `tests/integration/incidents.test.ts` | Coordinator assigns to active Technician and status becomes Assigned. |
| T-US7-2 | Database | `supabase/tests/business_rules_test.sql` | Inactive or non-Technician assignee is rejected. |
| T-US7-3 | Integration | `tests/integration/incidents.test.ts` | Coordinator updates the incident priority using an approved value. |
| T-BR3-1 | Database | `supabase/tests/business_rules_test.sql` | Incident asset belongs to the same branch as the incident. |
| T-BR4-1 | Database | `supabase/tests/business_rules_test.sql` | New incident starts with status New. |
| T-BR5-1 | Database | `supabase/tests/business_rules_test.sql` | Only an active Technician can be assigned by a permitted role. |
| T-BR9-1, T-BR10-1 | Database | `supabase/tests/rls_test.sql` | Reporter create and read scope is restricted to own branch. |

### Step 2 - Backend

- Implement OP8-OP12.
- Validate incident fields and asset/branch consistency in the database.
- Use `assign_incident` for assignment and reassignment.
- Add incident list and detail queries with role-scoped filters.

### Step 3 - Frontend

- Build S3 Incident Register, S4 Incident Detail and S5 Report Incident.
- Build M1 Assign Technician.
- Show incident status and priority as text as well as colour.
- Branch Reporter can create and read their own branch incidents but cannot assign or change status.

### Step 4 - Refactor and full check

- Refactor incident validation, list filters and shared error handling.
- Run `npm run check`, integration tests, reporter/Coordinator E2E tests and the relevant Phase 2 RLS regression tests.
- Confirm database policies are still the access boundary.

### Step 5 - Manual checks

- Sign in as a Branch Reporter and create a fictional scanner or printer incident.
- Sign in as a Support Coordinator and assign it to an active Technician.
- Sign in as a different branch Reporter and confirm the incident is not visible.

**Definition of Done**

- [ ] T-US5, T-US6 and T-US7 pass.
- [ ] T-BR3-T-BR5, T-BR9 and T-BR10 pass.
- [ ] S3-S5 and M1 show required states.
- [ ] Reporter cross-branch access is denied by RLS.
- [ ] Progress log is updated.

**Commit:** `Phase 5: incident reporting and coordination`

**STOP. Wait for `Start Phase 6`.**

## Phase 6: Technician workflow and visit history (F4)

**Goal:** Give Technicians an assigned worklist, controlled status progression, progress notes and service activity records.

**Covers:** F4, US8-US9, BR6-BR8, BR11-BR12.  
**Starts when:** Phase 5 is complete and the human says `Start Phase 6`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-US8-1 | Database/Integration | `supabase/tests/business_rules_test.sql` | Assigned Technician moves Assigned to In Progress. |
| T-US8-2 | Database | `supabase/tests/business_rules_test.sql` | Resolution is rejected without a 10-character summary. |
| T-US8-3 | Integration | `tests/integration/incident-updates.test.ts` | Assigned Technician adds a note and the timeline shows its author and timestamp. |
| T-US9-1 | Integration | `tests/integration/technician-visits.test.ts` | Assigned Technician records valid service activity while In Progress. |
| T-US9-2 | Database | `supabase/tests/rls_test.sql` | Non-assigned user cannot add service activity. |
| T-BR6-1 | Database | `supabase/tests/business_rules_test.sql` | Only assigned Technician can perform the permitted status transitions. |
| T-BR7-1 | Database | `supabase/tests/business_rules_test.sql` | Resolution summary is required and at least 10 characters. |
| T-BR8-1 | Database | `supabase/tests/business_rules_test.sql` | Status change creates an immutable history row. |
| T-BR11-1 | Database | `supabase/tests/business_rules_test.sql` | Technician can access only incidents currently assigned to them. |
| T-BR12-1 | Database | `supabase/tests/business_rules_test.sql` | Technician visit is allowed only for assigned incident while In Progress. |

### Step 2 - Backend

- Implement OP13-OP15.
- Use `change_incident_status` for all status transitions.
- Add update and technician visit insert operations with server-side ownership checks.
- Verify each progress note is attributed to the signed-in Technician and appears in the incident timeline.
- Ensure status history is trigger-written and cannot be edited by the browser.

### Step 3 - Frontend

- Build S9 Technician Worklist.
- Complete the Technician view of S4 Incident Detail.
- Build M4 Log Service Activity and M6 Confirm Resolution.
- Display the status timeline and service activity in chronological order.

### Step 4 - Refactor and full check

- Refactor status-transition helpers and incident timeline components.
- Run `npm run check`, database tests, Technician E2E tests and the relevant Phase 2 RLS regression tests.
- Confirm no client-side update can bypass the database status function.

### Step 5 - Manual checks

- Sign in as the assigned Technician and move an incident to In Progress.
- Add a remote or on-site activity record.
- Attempt to resolve without a summary and confirm the action is blocked.
- Resolve with a valid summary and verify the history row.

**Definition of Done**

- [ ] T-US8 and T-US9 pass.
- [ ] T-BR6-T-BR8, T-BR11 and T-BR12 pass.
- [ ] S4, S9, M4 and M6 show all required states.
- [ ] Invalid transitions and unauthorised service activity are rejected.
- [ ] Progress log is updated.

**Commit:** `Phase 6: technician workflow and service history`

**STOP. Wait for `Start Phase 7`.**

## Phase 7: Dashboard and Repeat Fault Watch (F5)

**Goal:** Provide basic operational visibility and reports using existing incident records.

**Covers:** F5, US10-US12 and BR13.  
**Starts when:** Phase 6 is complete and the human says `Start Phase 7`.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-US10-1 | Integration | `tests/integration/reports.test.ts` | Dashboard totals match the controlled seed dataset. |
| T-US11-1 | Database/Unit | `supabase/tests/repeat_fault_test.sql` | Asset with three incidents inside 30 days is flagged. |
| T-US11-2 | Database/Unit | `supabase/tests/repeat_fault_test.sql` | Asset with two incidents inside 30 days is not flagged. |
| T-US11-3 | E2E | `tests/e2e/repeat-fault-watch.spec.ts` | Selecting a repeat-fault asset opens its incident history. |
| T-US12-1 | Integration | `tests/integration/reports.test.ts` | Date, branch, category and status filters combine correctly. |
| T-US12-2 | Database/E2E | `tests/e2e/role-access.spec.ts` | Reporter and Technician cannot access organisation-wide reports. |
| T-BR13-1 | Database | `supabase/tests/repeat_fault_test.sql` | Repeat Fault Watch follows the rolling 30-day threshold. |

### Step 2 - Backend

- Implement OP16-OP18.
- Query dashboard totals and reports using database views/queries that respect RLS.
- Use the repeat-fault view from Phase 2; do not duplicate the threshold in frontend code.

### Step 3 - Frontend

- Build S2 Operations Overview and S10 Reports and Repeat Fault Watch.
- Add filters for date range, branch, category and status.
- Link each repeat-fault row to S7 Asset Detail.
- Ensure charts or totals have accessible text labels and do not rely on colour alone.

### Step 4 - Refactor and full check

- Refactor aggregate query handling and filter state.
- Run `npm run check`, report integration tests, all previous E2E tests and the SEC5/SEC12 regression tests from Phase 2.
- Confirm no metric includes records the current role is not permitted to read.

### Step 5 - Manual checks

- Compare dashboard totals with the seed incident list.
- Change the report filters and confirm the result changes as expected.
- Open the repeat-fault asset and inspect the incidents supporting the flag.
- Confirm a Technician and Branch Reporter cannot open S10.

**Definition of Done**

- [ ] T-US10, T-US11 and T-US12 pass.
- [ ] T-BR13 passes at the threshold and boundary.
- [ ] S2 and S10 show all required states.
- [ ] Report results respect RLS.
- [ ] Progress log is updated.

**Commit:** `Phase 7: dashboard and repeat fault reporting`

**STOP. Wait for `Start Phase 8`.**

## Phase 8: Hardening

**Goal:** Review the complete application for edge cases, usability, accessibility, responsive behaviour and security regressions.

**Covers:** All features, BR1-BR15, SEC1-SEC13 and NFR1-NFR10.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-EDGE1 | Integration | `tests/integration/assignment-race.test.ts` | Concurrent assignment attempts leave one valid current assignee and consistent history. |
| T-EDGE2 | Database | `supabase/tests/business_rules_test.sql` | Deactivated asset does not remove historical incident records. |
| T-EDGE3 | Database | `supabase/tests/rls_test.sql` | Deactivated Reporter cannot submit a stale form. |
| T-EDGE4 | Database | `supabase/tests/repeat_fault_test.sql` | 30-day boundary is deterministic and consistent. |
| T-EDGE5 | Component/E2E | `tests/e2e/network-error.spec.ts` | Network failure never displays false save success. |
| T-EDGE6 | Database | `supabase/tests/business_rules_test.sql` | Invalid status transition is rejected. |
| T-NFR-1 | Component/E2E | `tests/e2e/responsive-layout.spec.ts` | S1-S11 remain usable at 390px and 1440px without horizontal overflow or inaccessible primary actions. |
| T-NFR-2 | Component/Manual | `tests/components/accessibility.test.tsx` and checklist | Forms have labels, keyboard focus is visible, status meaning is not conveyed by colour alone and primary touch targets are at least 44px. |
| T-NFR-3 | E2E | `tests/e2e/performance.spec.ts` | Main incident list and detail views load within the 3-second seeded-demo target on the agreed test machine. |
| T-NFR-4 | Component/E2E | `tests/e2e/network-error.spec.ts` | Failed requests show an error and never display false save success. |
| T-NFR-5 | Manual/Static | `tests/architecture/maintainability-checklist.md` | Folders follow Section 5, shared behaviour is reused and duplicated business logic is not introduced. |
| T-NFR-6 | Database/Static | `supabase/tests/rls_test.sql` and `tests/unit/secrets.test.ts` | RLS is enabled for every exposed table and privileged keys are absent from the browser bundle. |
| T-NFR-7 | Database | `supabase/tests/business_rules_test.sql` | Each status change retains its actor and timezone-aware timestamp. |
| T-NFR-8 | Unit | `tests/unit/timezone.test.ts` | Stored timestamps retain timezone information and display using Africa/Johannesburg. |
| T-NFR-9 | Manual/Static | `tests/manual/seed-privacy-checklist.md` | Seed records are fictional and contain no real customer, payment-card, employee or credential data. |
| T-NFR-10 | Manual | `tests/manual/browser-compatibility.md` | Core journeys are checked on current Chrome and Edge desktop and a modern mobile browser. |
| T-E2E-1 to T-E2E-4 | E2E | `tests/e2e/` | Complete role journeys for Reporter, Coordinator, Technician and Administrator. |

### Step 2 - Backend

- Review RLS policies and ensure no broad policy weakens role isolation.
- Review database constraints, transaction boundaries and indexes.
- Run a secret scan and confirm no privileged key is committed.
- Check that the app does not expose unnecessary profile or asset fields.

### Step 3 - Frontend

- Complete responsive and keyboard-accessibility fixes.
- Check Loading, Empty, Error, Offline, Success and Unauthorised states for all applicable screens.
- Check status and priority meaning is not communicated by colour alone.
- Confirm long descriptions and notes do not break the layout.

### Step 4 - Refactor and full check

- Refactor only where behaviour remains unchanged.
- Run `npm run check`, `npx playwright test`, lint, type check and production build.
- Review failed tests; do not skip or weaken tests to obtain a green result.

### Step 5 - Manual checks

- Complete the role-based acceptance checklist at 390px and 1440px.
- Check keyboard-only navigation and visible focus.
- Test an offline/network-failure scenario.
- Check seeded examples for cross-branch data leakage.

**Definition of Done**

- [ ] All T-EDGE tests pass.
- [ ] NFR checks are completed and recorded.
- [ ] All role E2E journeys pass.
- [ ] No committed secrets are found.
- [ ] No unresolved critical/high security issue remains.
- [ ] Progress log is updated.

**Commit:** `Phase 8: hardening and acceptance checks`

**STOP. Wait for `Start Phase 9`.**

## Phase 9: Release

**Goal:** Prepare the academic demo deployment, documentation and final walkthrough.

**Covers:** All approved MVP features.

### Step 1 - Failing tests (Red)

| Test ID | Level | File | What it checks |
|---|---|---|---|
| T-REL-1 | Build | `package.json` | Clean production build succeeds from a clean clone. |
| T-REL-2 | E2E | `tests/e2e/release-demo.spec.ts` | Hosted demo role journeys pass with synthetic accounts. |
| T-REL-3 | Manual | `README.md` release checklist | Setup, environment variables, test accounts and demo steps are complete. |
| T-REL-4 | Security | Secret scan | No privileged secret exists in repository history or browser bundle. |

### Step 2 - Backend

- Apply reviewed migrations to the demo Supabase project.
- Load only synthetic demo data.
- Configure the hosted project URL and public key in Vercel environment settings.
- Keep the service-role key in Supabase Edge Function secrets or trusted local seed/test configuration only; do not add it to Vercel frontend variables.

### Step 3 - Frontend

- Deploy the production build to Vercel.
- Confirm all routes work when opened directly.
- Add the public demo URL and safe synthetic test-account instructions to README.

### Step 4 - Refactor and full check

- Run the complete check suite against the release candidate.
- Perform a clean-clone install and production build.
- Confirm release environment variables are documented and no secrets are exposed.

### Step 5 - Manual checks

- Walk through the demonstration sequence in PRD Section 14.
- Verify the demo URL from a private browser window.
- Confirm the four demo roles work and branch isolation is visible.
- Capture screenshots only from synthetic demo data.

**Definition of Done**

- [ ] T-REL-1 to T-REL-4 pass.
- [ ] Hosted application is available at the approved demo URL.
- [ ] README explains setup, scripts, synthetic accounts and demonstration sequence.
- [ ] Final acceptance and release checklists are complete.
- [ ] Progress log is updated.

**Commit:** `Phase 9: release academic demo`

**STOP. Do not begin additional features without a new approved scope.**

# 14. Traceability matrix

| PRD requirement | Feature/story/rule | Phase | Main tests | Screen/operation |
|---|---|---|---|---|
| Staff sign-in | F1, US1, SEC1 | 3 | T-US1-1, T-US1-2, T-US1-3, T-SEC1-A/D | S1, OP1 |
| Role-based route/data access | F1, US2, SEC2-SEC5 | 2-3 | T-US2-1, T-US2-2, T-SEC2-A/D to T-SEC5-A/D | AppShell, S2-S11 |
| Staff account creation/deactivation | F1, US13, SEC6 | 3 | T-US13-1, T-US13-2, T-SEC6-A/D | S11, M5, OP2-OP3 |
| Branch records | F2, US3, BR1, SEC6 | 2, 4 | T-US3-1, T-US3-2, T-BR1-1, T-SEC6-A/D | S8, M2, OP4-OP5 |
| Asset records | F2, US4, BR2, SEC7 | 2, 4 | T-US4-1, T-US4-2, T-US4-3, T-BR2-1, T-SEC7-A/D | S6-S7, M3, OP6-OP7 |
| Incident branch/asset consistency | F3, US5, BR3 | 2, 5 | T-US5-2, T-BR3-1 | S5, OP8 |
| New incident status | F3, BR4 | 2, 5 | T-BR4-1 | S5, OP8 |
| Assignment | F3, US7, BR5, SEC8 | 2, 5 | T-US7-1, T-US7-2, T-US7-3, T-BR5-1, T-SEC8-A/D | S4, M1, OP12 |
| Reporter create/read scope | F3, US5-US6, BR9-BR10, SEC3 | 2, 5 | T-US5-1, T-US6-1, T-BR9-1, T-BR10-1, T-SEC3-A/D | S3-S5, OP8-OP10 |
| Technician assignment scope | F4, US8-US9, BR11, SEC4 | 2, 6 | T-US9-2, T-BR11-1, T-SEC4-A/D | S4, S9, OP13-OP15 |
| Status transition and resolution | F4, US8, BR6-BR8, SEC9, SEC11 | 2, 6 | T-US8-1, T-US8-2, T-US8-3, T-BR6-1 to T-BR8-1, T-SEC9-A/D, T-SEC11-A/D | S4, S9, M6, OP14 |
| Service activity | F4, US9, BR12, SEC10 | 2, 6 | T-US9-1, T-BR12-1, T-SEC10-A/D | M4, OP15 |
| Dashboard totals | F5, US10 | 7 | T-US10-1 | S2, OP16 |
| Repeat Fault Watch | F5, US11, BR13 | 2, 7 | T-US11-1, T-US11-2, T-US11-3, T-BR13-1 | S10, OP17 |
| Filtered reports | F5, US12 | 7 | T-US12-1, T-US12-2 | S10, OP18 |
| No deletion and retention | BR14, SEC12 | 2, 4-6 | T-BR14-1, T-SEC12-A/D, T-EDGE2 | Database policies and operations |
| Secret handling | SEC13 | 1-3, 8, 9 | T-SEC13-A/D, T-NFR-6 | Edge Function configuration, local secrets and browser bundle |
| Timezone handling | BR15 | 2, 8 | T-BR15-1, T-EDGE4 | Date helpers and all timestamp views |
| Responsive, accessible, reliable application | NFR1-NFR10 | 1, 8, 9 | T-NFR-1 to T-NFR-10, T-EDGE5 | All screens |
| Exact user-facing wording | MSG1-MSG10 | 1, 3-7 | T-MSG1 to T-MSG10 | `src/lib/messages.ts`, all screens and modals |


## 14.1 Functional requirement traceability

Each functional requirement in PRD Section 6 is linked to at least one test, implementation phase and screen or backend operation.

| PRD requirement | Phase | Test(s) | Screen / operation |
|---|---|---|---|
| FR1.1 | 3 | T-US1-1 | S1, OP1 |
| FR1.2 | 3 | T-US1-2 | S1, OP1 |
| FR1.3 | 3 | T-US1-1, T-US2-1 | OP1 |
| FR1.4 | 3 | T-US2-1, T-US2-2 | Role-aware AppShell and landing routes |
| FR1.5 | 2, 3 | T-US13-1, T-SEC6-A/D | S11, M5, OP2 |
| FR1.6 | 2, 3 | T-US13-2, T-BR14-1, T-SEC6-A/D | S11, OP3 |
| FR1.7 | 3 | T-US1-3, T-SEC6-D | Public routes and Supabase Auth configuration |
| FR2.1 | 2, 4 | T-US3-1, T-SEC6-A/D | S8, M2, OP5 |
| FR2.2 | 2, 4 | T-US3-2, T-BR1-1 | S8, M2, OP5 |
| FR2.3 | 2, 4 | T-US4-1, T-BR2-1, T-SEC7-A/D | S6, M3, OP7 |
| FR2.4 | 4 | T-US4-1, T-US4-3 | S6, S7, M3, OP7 |
| FR2.5 | 2, 4 | T-US4-2, T-BR2-1 | S6, M3, OP7 |
| FR2.6 | 2, 4 | T-EDGE2, T-BR14-1, T-SEC6-A/D, T-SEC7-A/D | S6, S8, OP5, OP7 |
| FR2.7 | 2, 4, 5 | T-US5-1, T-SEC3-A/D | S5, asset selector, OP6, OP8 |
| FR3.1 | 2, 5 | T-US5-1, T-BR3-1, T-BR9-1 | S5, OP8 |
| FR3.2 | 2, 5 | T-US5-1, T-BR3-1, T-BR4-1 | S5, OP8 |
| FR3.3 | 2, 5 | T-BR4-1 | S5, OP8 |
| FR3.4 | 5 | T-US7-3, T-SEC12-A | S4, priority control, OP11 |
| FR3.5 | 2, 5 | T-US7-1, T-US7-2, T-BR5-1, T-SEC8-A/D | S4, M1, OP12 |
| FR3.6 | 2, 5 | T-US6-1, T-SEC3-A/D | S3, S4, OP9, OP10 |
| FR3.7 | 2, 5 | T-BR14-1, T-SEC12-D | Incident policies and OP9-OP12 |
| FR4.1 | 2, 6 | T-BR11-1, T-SEC4-A/D | S9, OP9 |
| FR4.2 | 2, 6 | T-US8-1, T-BR6-1, T-SEC9-A/D | S4, S9, OP14 |
| FR4.3 | 2, 6 | T-US8-2, T-BR7-1 | S4, S9, M6, OP14 |
| FR4.4 | 2, 6 | T-US8-3, T-SEC10-A/D | S4, S9, incident timeline, OP13 |
| FR4.5 | 2, 6 | T-US9-1, T-BR12-1 | M4, OP15 |
| FR4.6 | 2, 6 | T-US9-1, T-BR12-1 | M4, OP15 |
| FR4.7 | 2, 6 | T-US8-3, T-US9-1, T-BR8-1, T-BR15-1 | S4, S9, M4, M6, OP13-OP15 |
| FR5.1 | 7 | T-US10-1 | S2, OP16 |
| FR5.2 | 7 | T-US10-1 | S2, OP16 |
| FR5.3 | 2, 7 | T-US11-1, T-US11-2, T-BR13-1 | S10, OP17 |
| FR5.4 | 7 | T-US11-3 | S10, S7, OP17 |
| FR5.5 | 7 | T-US12-1 | S10, OP18 |
| FR5.6 | 2, 7 | T-US12-2, T-SEC5-A/D | S2, S10, OP16-OP18 |

## 14.2 Success measure traceability

| Measure | Proof in the implementation | Phase | Test(s) |
|---|---|---|---|
| SM1 Incident traceability | Saved incident includes branch, asset, reporter, priority and status. | 5 | T-US5-1, T-BR3-1, T-BR4-1 |
| SM2 Assignment visibility | Assigned incident identifies one active Technician. | 5 | T-US7-1, T-US7-2, T-BR5-1 |
| SM3 Status accountability | Status changes retain actor and timestamp. | 2, 6 | T-BR8-1, T-US8-1 |
| SM4 Resolution quality | Resolution requires a summary meeting the minimum length. | 6 | T-US8-2, T-BR7-1 |
| SM5 Repeat-fault visibility | Repeat Fault Watch applies the approved rolling-window threshold and links to history. | 2, 7 | T-US11-1, T-US11-2, T-US11-3, T-BR13-1 |
| SM6 Data separation | Reporter cannot access another branch's operational records. | 2, 5 | T-US6-1, T-SEC3-A/D |


## 14.3 Non-functional requirement traceability

| PRD requirement | Phase | Test(s) | Evidence |
|---|---|---|---|
| NFR1 Responsive layout | 1, 8 | T-NFR-1 | 390px, tablet and 1440px browser checks across S1-S11. |
| NFR2 Accessibility | 1, 8 | T-NFR-2 | Labels, visible focus, text-based status meaning and minimum 44px primary touch targets. |
| NFR3 Performance | 8 | T-NFR-3 | Seeded incident list and detail views meet the 3-second prototype target. |
| NFR4 Reliability | 1, 5-8 | T-NFR-4, T-EDGE5 | Failed requests show an error and never report a false save success. |
| NFR5 Maintainability | 1, 8 | T-NFR-5 | Planned folder structure, shared components and no duplicated business-rule logic. |
| NFR6 Security | 2, 8 | T-NFR-6, T-SEC1-A/D to T-SEC13-A/D | RLS on exposed tables and no privileged key in the browser bundle. |
| NFR7 Auditability | 2, 6 | T-NFR-7, T-BR8-1 | Each status change retains its actor and timestamp. |
| NFR8 Time handling | 2, 8 | T-NFR-8, T-BR15-1 | Timezone-aware storage and Africa/Johannesburg display. |
| NFR9 Privacy | 2, 8, 9 | T-NFR-9, T-REL-4 | Synthetic data only; no customer, payment-card or unnecessary personal data. |
| NFR10 Browser support | 8 | T-NFR-10 | Core journeys checked on supported current desktop and mobile browsers. |

# 15. Acceptance test checklist

The following checklist is the human-run acceptance view. Automated tests remain required even when an item is manually checked.

- [ ] T-US1-1: valid active staff member signs in.
- [ ] T-US1-2: invalid credentials are rejected.
- [ ] T-US1-3: public self-sign-up is unavailable.
- [ ] T-US2-1: all roles land on the correct screen.
- [ ] T-US2-2: forbidden routes are denied or redirected.
- [ ] T-US3-1: Administrator creates and updates a branch.
- [ ] T-US3-2: duplicate/blank store code is rejected.
- [ ] T-US4-1: asset is registered under an active branch.
- [ ] T-US4-2: duplicate/blank asset tag is rejected.
- [ ] T-US4-3: optional installation date is saved and displayed.
- [ ] T-US5-1: Reporter creates incident for own-branch asset.
- [ ] T-US5-2: cross-branch asset is rejected.
- [ ] T-US6-1: Reporter sees only own-branch incidents.
- [ ] T-US7-1: Coordinator assigns an active Technician.
- [ ] T-US7-2: inactive or non-Technician assignee is rejected.
- [ ] T-US7-3: Coordinator updates priority using an approved value.
- [ ] T-US8-1: assigned Technician changes Assigned to In Progress.
- [ ] T-US8-2: resolution summary is required.
- [ ] T-US8-3: progress note is attributed and visible in the timeline.
- [ ] T-US9-1: assigned Technician logs service activity.
- [ ] T-US9-2: non-assigned user cannot log service activity.
- [ ] T-US10-1: dashboard totals match source records.
- [ ] T-US11-1: three incidents in 30 days flags an asset.
- [ ] T-US11-2: two incidents in 30 days do not flag an asset.
- [ ] T-US11-3: Repeat Fault Watch opens the selected asset history.
- [ ] T-US12-1: report filters combine correctly.
- [ ] T-US12-2: Reporter/Technician cannot open organisation-wide reports.
- [ ] T-US13-1: Administrator creates a staff account.
- [ ] T-US13-2: deactivated profile cannot access protected data.
- [ ] T-BR1-1 to T-BR15-1: every business rule passes its test.
- [ ] T-SEC1-A/D to T-SEC13-A/D: every security rule has an allow and deny result.
- [ ] T-EDGE1: simultaneous assignment attempts leave one valid assignee and consistent history.
- [ ] T-EDGE2: asset deactivation preserves linked incident history.
- [ ] T-EDGE3: deactivated Reporter cannot submit a stale form.
- [ ] T-EDGE4: 30-day boundary uses the same inclusive rolling-window rule.
- [ ] T-EDGE5: network failure does not display false save success.
- [ ] T-EDGE6: invalid incident status transitions are rejected.
- [ ] T-NFR-1: responsive layout at 390px and 1440px.
- [ ] T-NFR-2: labels, keyboard focus, non-colour status and 44px touch targets.
- [ ] T-NFR-3: seeded-demo list and detail load within the 3-second target.
- [ ] T-NFR-4: failed requests never show false success.
- [ ] T-NFR-5: maintainability and folder-structure review is complete.
- [ ] T-NFR-6: RLS coverage and browser-bundle secret scan pass.
- [ ] T-NFR-7: status history retains actor and timestamp.
- [ ] T-NFR-8: timestamps display in Africa/Johannesburg.
- [ ] T-NFR-9: seed data is synthetic and privacy-safe.
- [ ] T-NFR-10: browser compatibility checks are recorded.
- [ ] T-MSG1 through T-MSG10: exact PRD message text is verified.
- [ ] T-E2E-1 to T-E2E-4: all four role journeys pass.

# 16. Final release checklist

- [ ] All nine phases are complete and approved.
- [ ] All automated tests pass from a clean clone.
- [ ] Database migrations apply in order and seed data is synthetic.
- [ ] RLS is enabled on every exposed table.
- [ ] Every SEC rule has passing allow and deny tests.
- [ ] No real secrets appear in Git or the browser bundle.
- [ ] All screens show their required states.
- [ ] Responsive and accessibility checks are recorded.
- [ ] Hosted demo works using the approved test accounts.
- [ ] README contains setup, commands, environment-variable descriptions and demo steps.
- [ ] The final demonstration uses fictional data only.

# 17. Progress log (updated after every phase)

| Phase | Date | Status | Tests passed/total | Commit | Notes |
|---|---|---|---|---|---|
| 1 | - | Not started | - | - | Awaiting mentor review and approval. |
| 2 | - | Blocked by Phase 1 | - | - | - |
| 3 | - | Blocked by Phase 2 | - | - | - |
| 4 | - | Blocked by Phase 3 | - | - | - |
| 5 | - | Blocked by Phase 4 | - | - | - |
| 6 | - | Blocked by Phase 5 | - | - | - |
| 7 | - | Blocked by Phase 6 | - | - | - |
| 8 | - | Blocked by Phase 7 | - | - | - |
| 9 | - | Blocked by Phase 8 | - | - | - |

# 18. Clarifications needed

These are explicit decisions for mentor/project-owner review. Proposed choices are recommendations for the academic MVP, not facts already confirmed by a stakeholder. Resolve blocking questions and update the PRD change log before Phase 1.

| # | Source / affected ID | Clarification | Proposed decision | Status |
|---|---|---|---|---|
| 1 | PRD 7, BR13, US11 | Is three incidents in a rolling 30-day window an appropriate definition of a repeat fault? | Use three or more incidents for the same asset in the previous rolling 30 days. | Open - confirm |
| 2 | PRD 8, S7, SEC3, BR10 | Should a Branch Reporter be able to open S7 Asset Detail and view the asset's incident history, or only select assets when creating an incident? | Allow read-only asset details and the incident history for that same branch. Do not expose any other branch's information. | Open - confirm |
| 3 | PRD 11, Section 4.1 | Are the proposed testing tools (Vitest, React Testing Library, pgTAP and Playwright) acceptable for the Melsoft project? | Use the listed tools if available in the learning environment; otherwise agree a simpler supported alternative before Phase 1. | Open - confirm |
| 4 | PRD 8, Section 7.3 | Are the proposed screen IDs and six modal flows sufficient, and can the screen designs be exported before implementation? | Use S1-S11 and M1-M6 as the MVP screen inventory and export one reviewed design per screen/modal. | Open - confirm |
| 5 | PRD 9, BR12 | Should a service activity record be mandatory before an incident can be resolved? | Keep the service activity optional because some faults may be resolved remotely without a separately recorded visit; the resolution summary remains mandatory. | Open - confirm |
| 6 | PRD 14 | Is a Vercel-hosted demo with four synthetic role accounts sufficient for assessment? | Use a hosted web demo and four synthetic role accounts, with no real retailer data. | Open - confirm |

**Build gate:** Phase 1 remains blocked until the human has reviewed these decisions, updated the PRD where required and changed the relevant rows to Answered. If a proposal is rejected, revise the PRD and this plan together.

# 19. Change log

| Version | Date | Change | Status |
|---|---|---|---|
| 0.1 | 4 Nov 2026 | Initial implementation plan prepared from BranchPulse PRD v0.2 and the Melsoft reference-document structure. | Superseded |
| 0.2 | 4 Nov 2026 | Updated the version baseline after checking current official releases, added individual message, functional-requirement and non-functional requirement traceability, added missing acceptance tests and installation-date persistence, and aligned SEC12/SEC13 with the PRD and server-side staff function. | Proposed for review |
