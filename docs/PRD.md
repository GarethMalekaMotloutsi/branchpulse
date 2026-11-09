% BranchPulse
% Product Requirements Document (PRD) | v0.2
% Melsoft Academy | 4 November 2026

**Document status:** Draft for academic review  
**Product:** BranchPulse - Retail Branch Technology and Incident Management  
**Intended platform:** Responsive web application  
**Primary users:** Retail branch reporters, support coordinators, technicians and administrators

---

# 1. Document purpose and submission motivation

## 1.1 Purpose

This Product Requirements Document defines the problem, intended users, product scope, functional behaviour, business rules, data requirements and acceptance criteria for BranchPulse. It is the product source of truth for the accompanying `IMPLEMENTATION_PLAN.md`.

The document is written before implementation so that the project can be reviewed, challenged and agreed before code is produced. Requirements use stable IDs so that each feature can be linked to its screens, database rules, implementation phase and tests.

## 1.2 Why this project was selected

Retail branches depend on everyday technology to keep normal operations moving. A barcode scanner that stops communicating, a printer that cannot produce a report, a workstation that loses network access or a point-of-sale device that repeatedly fails can interrupt work at a branch. The technical issue may look small, but the people reporting it still need to explain what happened, identify the affected equipment and find out whether anyone is working on it.

In many support environments, the information needed to understand an incident can be spread across phone calls, messages, email threads, spreadsheets and technician notes. This makes it harder to answer straightforward questions: Which branch is affected? Which device has failed before? Who is attending to the problem? What was done during the last visit? Is the issue isolated or recurring?

BranchPulse is intended to bring those operational records into one simple system. The idea is grounded in a familiar support workflow rather than an artificial classroom scenario. It is deliberately limited to incident reporting, equipment records, technician activity and basic operational visibility. It does not attempt to replace a retailer's POS platform, network monitoring tools or enterprise service-management system.

The academic motivation is to demonstrate how a practical business problem can be translated into a structured software solution. The project provides opportunities to apply requirements analysis, relational database design, authentication, role-based access, CRUD operations, business rules, testing and deployment in one manageable application.

## 1.3 Submission rationale

The proposed solution is appropriate for a Melsoft project because the problem is understandable, the user roles are distinct, the data relationships are meaningful and the MVP can be demonstrated using fictional branch and equipment data. It is broad enough to show full-stack development skills but controlled enough to complete in phases without introducing integrations that are outside the assignment scope.

BranchPulse is an academic prototype. It is not presented as an approved system for a named retailer, and it will not use real store records, employee information, device credentials or customer data.

# 2. Product overview

## 2.1 Product summary

BranchPulse is a responsive web application that gives a retail support team one place to record branch technology incidents and the equipment involved. A Branch Reporter logs a problem against an asset at their own branch. A Support Coordinator reviews the incident, sets its priority and assigns an active Technician. The assigned Technician records progress, optional service visits and a resolution summary. Administrators and Support Coordinators use an overview and reports to understand open work and identify equipment with repeat faults.

## 2.2 Problem statement

Retail technology incidents can be difficult to coordinate when branch information, equipment details, assignment decisions and service history are kept in separate channels. Without a consistent incident record, support staff may spend time confirming basic information, technicians may not see previous work on the same device, and managers may struggle to identify recurring problems across branches.

## 2.3 Product vision

Provide a clear, reliable record of what failed, where it failed, who is responsible for the next action and what was done to resolve it.

## 2.4 Product objectives

- Make it possible to report a technology incident against a specific branch and asset.
- Give Support Coordinators a shared view of incidents across branches.
- Give Technicians a focused worklist containing incidents assigned to them.
- Preserve a history of status changes and recorded service activity.
- Highlight assets with repeated incidents using a clearly defined rule.
- Provide basic branch and date filters without building a complex analytics platform.

## 2.5 Success measures for the academic MVP

These are acceptance targets for the prototype, not claims about an existing live service.

| ID | Measure | MVP target |
|---|---|---|
| SM1 | Incident traceability | Every saved incident has a branch, asset, reporter, priority and status. |
| SM2 | Assignment visibility | Every assigned incident identifies one active Technician. |
| SM3 | Status accountability | Every status change creates a history record with actor and timestamp. |
| SM4 | Resolution quality | An incident cannot be marked Resolved without a resolution summary. |
| SM5 | Repeat-fault visibility | The Repeat Fault Watch identifies assets with at least three incidents in the previous rolling 30 days. |
| SM6 | Data separation | A Branch Reporter cannot read incidents or assets belonging to another branch. |

# 3. Scope

## 3.1 MVP features

| Feature ID | Feature | Priority | Description |
|---|---|---|---|
| F1 | Staff account and role access | Must | Staff sign in and receive access according to their assigned role. Administrators create and deactivate accounts. |
| F2 | Branch and asset register | Must | Maintain branch records and the equipment registered at each branch. |
| F3 | Incident reporting and coordination | Must | Report incidents, review the incident register, set priority and assign a Technician. |
| F4 | Technician workflow and visit history | Must | Let assigned Technicians update progress, record service activity and resolve incidents. |
| F5 | Operational dashboard and Repeat Fault Watch | Should | Show operational totals, filtered reports and assets meeting the repeat-fault rule. |

## 3.2 User stories

| Story ID | User story | Feature |
|---|---|---|
| US1 | As a staff member, I want to sign in securely so that I can access the work relevant to my role. | F1 |
| US2 | As a user, I want the system to restrict screens and records according to my role so that I only access permitted information. | F1 |
| US3 | As an Administrator, I want to create and update branches so that the branch register remains accurate. | F2 |
| US4 | As an Administrator or Support Coordinator, I want to register an asset under a branch so that incidents can be linked to the correct equipment. | F2 |
| US5 | As a Branch Reporter, I want to log an incident against an asset at my branch so that the support team receives consistent information. | F3 |
| US6 | As a Branch Reporter, I want to view incidents from my own branch so that I can check their status. | F3 |
| US7 | As a Support Coordinator, I want to set priority and assign an incident to an active Technician so that responsibility is clear. | F3 |
| US8 | As an assigned Technician, I want to update an incident's progress and record its resolution so that the incident has a clear outcome. | F4 |
| US9 | As an assigned Technician, I want to record a service visit or remote support activity so that work performed is traceable. | F4 |
| US10 | As an Administrator or Support Coordinator, I want to view incident totals by status and priority so that I can understand the current workload. | F5 |
| US11 | As an Administrator or Support Coordinator, I want to identify assets with repeat incidents so that recurring faults are visible. | F5 |
| US12 | As an Administrator or Support Coordinator, I want to filter reports by date, branch, category and status so that I can review a specific part of the workload. | F5 |
| US13 | As an Administrator, I want to create and deactivate staff accounts so that access reflects current responsibilities. | F1 |

## 3.3 Deferred features and non-goals

The following items are not part of the MVP and must not be implemented unless a later version is approved:

- Integration with a retailer's POS, ERP, inventory, HR or identity-management systems.
- Automatic device discovery, network scanning, remote desktop, remote device control or live monitoring.
- Customer-facing accounts, customer service requests or a public ticket portal.
- WhatsApp, SMS, email or push notifications.
- In-app chat, voice calls or video calls.
- Procurement, stock ordering, parts inventory, supplier management or cost accounting.
- Service-level agreement automation, penalty calculations or contract management.
- Native Android or iPhone applications. The MVP is a responsive browser-based application.
- Offline incident submission or automatic synchronisation after a network outage.
- File attachments, photographs, CCTV footage or uploaded documents.
- Multi-company SaaS tenancy and self-service organisation registration.
- Predictive maintenance, AI fault diagnosis or automated recommendations.
- Maps, GPS tracking or live technician location.
- Automated scheduling, route optimisation or calendar integration.
- Deleting incidents or editing the historical status audit trail.

# 4. Users and access roles

## 4.1 Roles

| Role | Main responsibility | Access summary |
|---|---|---|
| Administrator | Maintains staff access and branch records and oversees the application. | All branches, assets, incidents and reports; can create/deactivate users and manage branches. |
| Support Coordinator | Triage and coordination of incidents across branches. | All branches and incidents; can manage assets, set priority, assign Technicians and view reports. Cannot change an incident's status on behalf of its assigned Technician. |
| Technician | Investigates and resolves assigned incidents. | Assigned incidents, related asset details, own worklist, status updates and service activity. Cannot browse the full incident register. |
| Branch Reporter | Reports issues and checks incidents for their own branch. | Can create incidents and view incidents/assets for the branch attached to their profile. Cannot assign work or change incident status. |

## 4.2 Access principles

- User accounts are created by an Administrator. Public self-registration is not available.
- Each Branch Reporter profile is linked to exactly one active branch.
- A Technician can only access incidents currently assigned to that Technician.
- Support Coordinators and Administrators can see incidents across all active and inactive branches, subject to record-retention rules.
- Deactivated users cannot access protected application data, even if an old browser session remains open.
- Screen hiding is not a security control. The database must enforce record permissions.

# 5. Core workflows

## 5.1 Branch Reporter logs an incident

1. The Branch Reporter signs in.
2. The system identifies the branch linked to the user's profile.
3. The Branch Reporter selects an asset from that branch's active asset list.
4. The user selects an incident category and priority, enters a short title and describes the problem.
5. The system validates that the selected asset belongs to the user's branch.
6. The system saves the incident with status New and records the reporter and timestamp.
7. The incident appears in the Support Coordinator's incident register and the Branch Reporter's branch view.

## 5.2 Support Coordinator assigns an incident

1. The Support Coordinator opens an incident in status New or Assigned.
2. The Coordinator reviews the branch, asset, description and previous incident history.
3. The Coordinator sets or adjusts the priority and selects an active user with the Technician role.
4. The system records the assignment and changes the status to Assigned.
5. The assigned Technician sees the incident on their worklist.

## 5.3 Technician resolves an incident

1. The Technician opens an incident assigned to them.
2. The Technician changes the status from Assigned to In Progress.
3. The Technician may add a progress note or record an on-site/remote service activity.
4. The Technician enters a resolution summary of at least 10 characters.
5. The system allows the status to change from In Progress to Resolved.
6. The status history preserves who made the change and when.

## 5.4 Coordinator reviews repeat faults

1. The Support Coordinator opens the Repeat Fault Watch.
2. The system groups incidents by asset for the previous rolling 30 days.
3. An asset is flagged when three or more incidents have been recorded against it in that period.
4. The Coordinator opens the asset history to review the related incidents.

# 6. Functional requirements

## 6.1 F1 - Staff account and role access

- FR1.1: The system shall allow an active staff member to sign in using their registered email and password.
- FR1.2: The system shall reject invalid credentials without revealing whether an email address is registered.
- FR1.3: After authentication, the application shall load the user's active profile and role.
- FR1.4: The application shall route the user to the correct landing screen for their role.
- FR1.5: An Administrator shall be able to create staff accounts and assign one of the four approved roles.
- FR1.6: An Administrator shall be able to deactivate a staff profile. Deactivation shall not delete incident history.
- FR1.7: Public self-registration shall not be provided.

## 6.2 F2 - Branch and asset register

- FR2.1: An Administrator shall be able to create and update branch details.
- FR2.2: Each branch shall have a unique store code.
- FR2.3: An Administrator or Support Coordinator shall be able to register an asset against one active branch.
- FR2.4: Each asset shall have an asset tag, category and display name. Manufacturer, model, serial number and installation date may be recorded when known.
- FR2.5: Asset tags shall be unique in the MVP organisation.
- FR2.6: Assets and branches shall be deactivated rather than deleted when no longer in use.
- FR2.7: A Branch Reporter shall only view active assets belonging to their own branch.

## 6.3 F3 - Incident reporting and coordination

- FR3.1: A Branch Reporter shall be able to create an incident for an active asset at their own branch.
- FR3.2: An incident shall record its branch, asset, reporter, title, description, category, priority, status and creation timestamp.
- FR3.3: New incidents shall start with status New.
- FR3.4: A Support Coordinator shall be able to review incidents across branches and update priority.
- FR3.5: A Support Coordinator shall be able to assign or reassign an incident to an active Technician.
- FR3.6: A Branch Reporter shall be able to view incidents from their own branch but shall not assign work or change status.
- FR3.7: An incident shall not be deleted through the application.

## 6.4 F4 - Technician workflow and visit history

- FR4.1: A Technician shall have a worklist containing only incidents assigned to them.
- FR4.2: The assigned Technician shall be able to move an incident from Assigned to In Progress.
- FR4.3: The assigned Technician shall be able to move an incident from In Progress to Resolved only after entering a resolution summary of at least 10 characters.
- FR4.4: The assigned Technician shall be able to add progress notes to an incident assigned to them.
- FR4.5: The assigned Technician shall be able to record an on-site or remote service activity while the incident is In Progress.
- FR4.6: A service activity shall record date, activity type, outcome and time spent in minutes.
- FR4.7: Status changes and service activity records shall retain their author and timestamp.

## 6.5 F5 - Operational dashboard and Repeat Fault Watch

- FR5.1: Administrators and Support Coordinators shall see totals for New, Assigned, In Progress and Resolved incidents.
- FR5.2: The dashboard shall show open incidents by priority.
- FR5.3: The Repeat Fault Watch shall identify assets with at least three incidents created in the previous rolling 30 days.
- FR5.4: The user shall be able to open the incident history for an asset shown in the Repeat Fault Watch.
- FR5.5: Reports shall be filterable by date range, branch, incident category and status.
- FR5.6: Report totals shall be derived from incident records and shall respect the user's access permissions.

# 7. Business rules

| Rule ID | Rule |
|---|---|
| BR1 | A Branch store code must be unique and cannot be blank. Before saving, trim surrounding spaces and convert it to uppercase so that codes are compared consistently. |
| BR2 | An asset must belong to one existing branch; an asset tag must be unique and cannot be blank. |
| BR3 | An incident's selected asset must belong to the same branch recorded on the incident. |
| BR4 | Every new incident starts with status New. The permitted statuses are New, Assigned, In Progress and Resolved. |
| BR5 | Only an Administrator or Support Coordinator may assign or reassign an incident, and the selected assignee must be an active Technician. |
| BR6 | Only the currently assigned Technician may move an incident from Assigned to In Progress and from In Progress to Resolved. Other status transitions are rejected. |
| BR7 | A resolution summary containing at least 10 characters is required before an incident can be marked Resolved. |
| BR8 | Every status change must create an immutable history record containing the incident, old status, new status, actor and timestamp. |
| BR9 | A Branch Reporter may create an incident only for an active asset belonging to the branch linked to their profile. |
| BR10 | A Branch Reporter may read incidents and assets only for the branch linked to their profile. |
| BR11 | A Technician may read and update only incidents currently assigned to them, plus the related asset and branch details needed to perform the work. |
| BR12 | A Technician may record a service activity only for an incident assigned to them while its status is In Progress. |
| BR13 | An asset is flagged as a repeat fault when at least three incidents for that asset have `created_at >= query_time - 30 days` and `created_at <= query_time`. The flag is calculated from incident records, not manually entered. |
| BR14 | Incident records and status history cannot be deleted through the application. Branches, assets and staff profiles are deactivated rather than deleted. |
| BR15 | Timestamps are stored as timezone-aware values and displayed using the Africa/Johannesburg time zone. |

# 8. Screens and navigation requirements

The screen list is the functional screen specification. Graphic design exports are not included in the supplied reference material and must be created separately before visual implementation. Proposed export names are listed below.

| Screen ID | Screen | Route | Who can open it | Main purpose |
|---|---|---|---|---|
| S1 | Sign in | `/login` | Public | Authenticate staff and show validation states. |
| S2 | Operations overview | `/dashboard` | Administrator, Support Coordinator | Show incident totals, priority overview and links to operational work. |
| S3 | Incident register | `/incidents` | Administrator, Support Coordinator; Branch Reporter sees own branch; Technician sees assigned items | Search and filter incident records within role permissions. |
| S4 | Incident detail | `/incidents/:id` | Administrator, Support Coordinator, assigned Technician, Branch Reporter from same branch | Show incident details, assignment, status history, notes and related asset. |
| S5 | Report incident | `/incidents/new` | Branch Reporter | Create a new incident against an asset at the user's branch. |
| S6 | Asset register | `/assets` | Administrator, Support Coordinator | List and manage registered assets. |
| S7 | Asset detail | `/assets/:id` | Administrator, Support Coordinator; assigned Technician and same-branch Branch Reporter have read-only access where relevant | Show asset information and incident history. |
| S8 | Branch management | `/branches` | Administrator | Create, update and deactivate branches. |
| S9 | Technician worklist | `/my-work` | Technician | Show incidents assigned to the signed-in Technician. |
| S10 | Reports and Repeat Fault Watch | `/reports` | Administrator, Support Coordinator | Filter incident totals and inspect repeat-fault assets. |
| S11 | Staff management | `/staff` | Administrator | Create, view and deactivate staff accounts. |

## 8.1 Modals

| Modal ID | Modal | Parent screen | Access |
|---|---|---|---|
| M1 | Assign Technician | S4 | Administrator, Support Coordinator |
| M2 | Branch form | S8 | Administrator |
| M3 | Asset form | S6 | Administrator, Support Coordinator |
| M4 | Log service activity | S4, S9 | Assigned Technician |
| M5 | Staff account form | S11 | Administrator |
| M6 | Confirm resolution | S4, S9 | Assigned Technician |

## 8.2 User-facing message catalogue

The following messages are the approved MVP wording. The implementation shall use these exact strings rather than inventing messages inside individual screens.

| Message ID | Situation | Exact message |
|---|---|---|
| MSG1 | Invalid sign-in | Email or password is incorrect. |
| MSG2 | Required fields missing | Please complete all required fields. |
| MSG3 | Access denied | You do not have access to this page. |
| MSG4 | Incident created | Incident submitted successfully. |
| MSG5 | Technician assigned | Technician assigned successfully. |
| MSG6 | Status updated | Incident status updated successfully. |
| MSG7 | Resolution summary too short | Add a resolution summary of at least 10 characters. |
| MSG8 | Service unavailable/offline | You are offline. Reconnect and try again. |
| MSG9 | Data load failure | We could not load this information. Please try again. |
| MSG10 | Generic save failure | We could not save your changes. Please try again. |

## 8.3 Required screen states

Every applicable screen must handle Normal, Loading, Empty, Error and Offline states. Success feedback is required after a successful create, update, assignment or resolution action. Offline state means the user cannot currently reach the service; the MVP does not queue or save offline changes. Protected screens must also handle an Unauthorised state and redirect the user to the correct permitted screen.

# 9. Data requirements

## 9.1 Main entities

| Entity | Purpose | Key fields |
|---|---|---|
| Profile | Application identity and role linked to Supabase Auth. | id, full_name, email, role, branch_id, is_active, created_at |
| Branch | One retail branch in the demo organisation. | id, store_code, name, province, city, address, is_active |
| Asset | A piece of technology registered at a branch. | id, branch_id, asset_tag, display_name, category, manufacturer, model, serial_number, installation_date, is_active |
| Incident | One report of a technology problem. | id, branch_id, asset_id, reported_by, assigned_to, title, description, category, priority, status, resolution_summary, created_at, updated_at |
| IncidentUpdate | A progress or coordination note attached to an incident. | id, incident_id, author_id, note, created_at |
| TechnicianVisit | A record of on-site or remote work performed on an incident. | id, incident_id, technician_id, activity_type, activity_date, outcome, time_spent_minutes, created_at |
| IncidentStatusHistory | Append-only record of incident status transitions. | id, incident_id, old_status, new_status, changed_by, changed_at |

## 9.2 Data constraints

- Primary keys use UUID values.
- Branch `store_code`, `name`, `province` and `city` are required. `address` is optional.
- Asset `branch_id`, `asset_tag`, `display_name` and `category` are required. Manufacturer, model, serial number and installation date are optional.
- Asset categories are `Scanner`, `Printer`, `POS Terminal`, `Workstation`, `Network Device` and `Other`.
- Incident `branch_id`, `asset_id`, `reported_by`, `title`, `description`, `category`, `priority` and `status` are required. `assigned_to` and `resolution_summary` remain empty until the relevant workflow step.
- Incident categories are `Network`, `Printer`, `Scanner`, `POS`, `Workstation`, `Software` and `Other`.
- Priority values are `Low`, `Medium`, `High` and `Urgent`. Status values are `New`, `Assigned`, `In Progress` and `Resolved`.
- A service activity must have an `on_site` or `remote` activity type, a non-empty outcome and a positive whole-number time-spent value.
- The database must enforce BR1 to BR15 where applicable; client-side validation is additional usability support, not the security boundary.
- `role`, `category`, `priority`, `status` and `activity_type` use constrained values.
- Branch and asset deactivation must preserve all linked incident history.

# 10. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR1 | Responsive layout: the app shall remain usable at a 390px mobile viewport and a 1440px desktop viewport. |
| NFR2 | Accessibility: forms have labels, keyboard focus is visible, status is not communicated by colour alone, and primary touch targets are at least 44px high. |
| NFR3 | Performance: common list and detail views should load within 3 seconds on a normal broadband connection using the seeded demo dataset. This is a prototype target, not a production SLA. |
| NFR4 | Reliability: failed network requests must show an error state and must not display a false success message. |
| NFR5 | Maintainability: code is organised by feature and shared logic is not duplicated across screens. |
| NFR6 | Security: all protected database tables use Row-Level Security (RLS), and privileged keys are never exposed to the browser. |
| NFR7 | Auditability: incident status changes are preserved and attributable to an authenticated user. |
| NFR8 | Time handling: user-facing timestamps use Africa/Johannesburg while stored timestamps retain timezone information. |
| NFR9 | Privacy: demo records are fictional. The system does not store customer payment card information, passwords in application tables or unnecessary personal data. |
| NFR10 | Browser support: verify the current Chrome and Edge desktop browsers and a modern mobile browser during manual acceptance checks. |

# 11. Proposed technical approach

The following stack is selected for the academic MVP. The implementation plan must use these tools unless a mentor review changes the decision.

| Layer | Proposed technology | Reason |
|---|---|---|
| Frontend | React with Vite | Suitable for a responsive single-page web application. |
| Language | TypeScript | Helps keep user, incident and database types consistent. |
| Styling | Tailwind CSS | Allows consistent responsive styling without a large custom CSS layer. |
| Backend and database | Supabase PostgreSQL and Supabase Edge Functions | Stores relational records and hosts the small trusted staff-management operation. |
| Authentication | Supabase Auth | Provides managed email/password authentication. |
| Server-side function runtime | Supabase Edge Functions (Deno runtime) | Creates staff identities after verifying the caller is an Administrator. |
| Authorisation | Supabase Row-Level Security | Enforces record permissions in the database. |
| Hosting | Vercel | Hosts the web application for the academic demo. |
| Version control | GitHub | Stores project history and documentation. |
| Unit and component tests | Vitest and React Testing Library | Tests pure business rules and UI states. |
| Database tests | Supabase CLI and pgTAP | Tests constraints, functions, triggers and RLS policies. |
| End-to-end tests | Playwright | Tests the main role-based user journeys in a browser. |

No separate Express/NestJS API is required in the MVP. The browser uses the Supabase client with the public anon key; RLS protects data access. Status changes and assignments use database functions with explicit permission checks. Staff identity creation uses a small Supabase Edge Function that verifies the calling Administrator before using privileged Auth operations. The service-role key is stored only in server-side function secrets and trusted seed/test configuration; it is never used by the browser.

# 12. Security and privacy requirements

## 12.1 Security requirements

| Security ID | Requirement |
|---|---|
| SEC1 | Only authenticated, active profiles may access protected application data. |
| SEC2 | A staff member may read their own profile; only Administrators may read all staff profiles. |
| SEC3 | A Branch Reporter may read only branches, assets and incidents belonging to their linked branch. |
| SEC4 | A Technician may read only incidents assigned to them and the related asset/branch data needed for those incidents. |
| SEC5 | Administrators and Support Coordinators may read the organisation's operational records. |
| SEC6 | Only Administrators may create, update or deactivate branches and staff profiles. |
| SEC7 | Only Administrators and Support Coordinators may create, update or deactivate assets. |
| SEC8 | Only Administrators and Support Coordinators may assign or reassign incidents to active Technicians. |
| SEC9 | Only the currently assigned Technician may change an incident's status. |
| SEC10 | Only the currently assigned Technician may add incident updates or service activity to that incident. |
| SEC11 | Incident status history is written by a database trigger and cannot be updated or deleted by application users. |
| SEC12 | Administrators and Support Coordinators may update permitted incident fields, such as priority; no application role can delete an incident. |
| SEC13 | Supabase service-role credentials are secret and must never be included in frontend code, browser bundles, screenshots or Git. |

## 12.2 Privacy approach

The MVP stores staff names and email addresses for account management, and operational descriptions relating to branch equipment. It must not store customer names, customer transaction information, card data, passwords in application tables or staff identity numbers. Demo data must be synthetic. Access to incidents must follow the role and branch rules above.

# 13. Acceptance criteria and test identifiers

## 13.1 User-story acceptance criteria

| Test ID | Acceptance criterion |
|---|---|
| T-US1-1 | A valid active staff member can sign in and reach the application. |
| T-US1-2 | Invalid credentials are rejected and no protected data is shown. |
| T-US1-3 | No public sign-up route is available and a public visitor cannot create a staff account. |
| T-US2-1 | Each role is routed to its permitted landing screen. |
| T-US2-2 | A user who opens a route outside their role is denied or redirected. |
| T-US3-1 | An Administrator can create and update a branch. |
| T-US3-2 | A duplicate or blank store code is rejected. |
| T-US4-1 | An Administrator or Support Coordinator can register an asset under an active branch. |
| T-US4-2 | A duplicate or blank asset tag is rejected. |
| T-US4-3 | An optional installation date can be saved for an asset and shown on its detail screen. |
| T-US5-1 | A Branch Reporter can create an incident for an active asset in their own branch. |
| T-US5-2 | An incident cannot be saved when the asset belongs to a different branch. |
| T-US6-1 | A Branch Reporter sees incidents from their own branch only. |
| T-US7-1 | A Support Coordinator can assign an incident to an active Technician. |
| T-US7-2 | An inactive user or a non-Technician cannot be selected as assignee. |
| T-US7-3 | A Support Coordinator can update an incident priority to one of the approved values. |
| T-US8-1 | The assigned Technician can move an incident from Assigned to In Progress. |
| T-US8-2 | The assigned Technician cannot resolve an incident without a 10-character resolution summary. |
| T-US8-3 | The assigned Technician can add a progress note that is attributed to them and shown in the incident timeline. |
| T-US9-1 | The assigned Technician can save a service activity while the incident is In Progress. |
| T-US9-2 | A user who is not the assigned Technician cannot add a service activity. |
| T-US10-1 | Dashboard totals match the underlying incident records for the selected dataset. |
| T-US11-1 | An asset with at least three incidents in the previous rolling 30 days appears in Repeat Fault Watch. |
| T-US11-2 | An asset with fewer than three incidents in the previous rolling 30 days does not appear in Repeat Fault Watch. |
| T-US11-3 | A user can open the relevant asset incident history from a Repeat Fault Watch result. |
| T-US12-1 | Report filters return only records matching the selected date range, branch, category and status. |
| T-US12-2 | A Branch Reporter and Technician cannot open organisation-wide reports. |
| T-US13-1 | An Administrator can create a staff profile with one approved role. |
| T-US13-2 | A deactivated staff member cannot access protected records. |

## 13.2 Business-rule tests

Each BR requirement must have a database or unit test: `T-BR1-1` through `T-BR15-1`, one primary test per rule. Rules that contain a rejection path must also have a negative test.

## 13.3 Security tests

Each SEC requirement must have separate allow and deny tests named `T-SEC1-A` / `T-SEC1-D` through `T-SEC13-A` / `T-SEC13-D`. A denied operation must be tested against the database or trusted operation, not only by hiding a button.

## 13.4 Edge-case tests

| Test ID | Edge case |
|---|---|
| T-EDGE1 | Two users attempt to assign the same incident at nearly the same time; the final assignment is valid and history is consistent. |
| T-EDGE2 | An asset is deactivated after incidents already exist; historical incidents remain readable to permitted users. |
| T-EDGE3 | A branch reporter submits a stale form after their account is deactivated; the server rejects the write. |
| T-EDGE4 | A repeat-fault asset has incidents on the 30-day boundary; the rolling-window rule is applied consistently. |
| T-EDGE5 | A network failure occurs during an update; the UI does not show success and the user can retry safely. |
| T-EDGE6 | A Technician attempts an invalid status transition; the database rejects it. |

# 14. Demo data and demonstration plan

The demo uses fictional data only. The seed dataset will contain one fictional organisation named Northline Retail Demo and three fictional Gauteng branches: Midrand Central (GP-MID-001), Sandton North (GP-SAN-002) and Pretoria East (GP-PTA-003). Each branch will have a small number of assets, such as a barcode scanner, network printer and workstation, plus test users for the four roles. Seed incidents will include examples such as a scanner losing Wi-Fi connectivity, a printer failing to print and a workstation losing network access. No live IP addresses, passwords, retailer systems or real employee records will be used. One asset will have three or more incidents inside the rolling 30-day period to demonstrate the Repeat Fault Watch. A second asset will have fewer than three incidents to demonstrate the threshold boundary.

The demonstration will follow this sequence:

1. Sign in as a Branch Reporter and create a scanner or printer incident for the reporter's branch.
2. Sign in as a Support Coordinator, review the incident, set its priority and assign a Technician.
3. Sign in as the assigned Technician, move the incident to In Progress, record service activity and resolve it with a summary.
4. Sign in as an Administrator or Support Coordinator and show the updated dashboard and incident history.
5. Open Repeat Fault Watch and explain why the seeded repeat-fault asset is flagged.
6. Demonstrate that a Branch Reporter cannot access another branch's records.

# 15. Assumptions and dependencies

- The academic MVP represents one fictional retail organisation. Multi-company tenancy is deferred.
- The application requires an internet connection.
- Staff accounts are created by an Administrator; no public registration is required.
- The project owner will create or export screen designs before visual implementation is considered complete.
- Supabase and Vercel accounts are available for development and demonstration.
- Branch, asset and incident data used in testing are synthetic.
- Mentor review may change the repeat-fault threshold or role permissions before implementation.

# 16. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Requirements expand into a full enterprise service-management product. | Project becomes too large to complete. | Keep to the five MVP features and maintain the deferred list. |
| Incorrect branch or role permissions expose records. | High security and trust impact. | Test RLS with separate test users for every role and both allow/deny cases. |
| Asset details are incomplete when an incident is reported. | Support staff may not identify the device. | Make asset tag, display name and category required; keep manufacturer/model optional. |
| Users enter inconsistent incident descriptions. | Slower triage and reporting. | Use category and priority selections plus a required description. |
| Repeat-fault counts are interpreted inconsistently. | False or missed repeat-fault flags. | Define one rolling 30-day rule and test the threshold and time boundary. |
| Real branch information is accidentally used in the demo. | Privacy or confidentiality risk. | Use fictional names, codes, records and accounts only. |

# 17. Glossary

| Term | Meaning |
|---|---|
| Branch | A retail store or location represented in the system. |
| Asset | A registered item of branch technology, such as a scanner, printer or workstation. |
| Incident | A recorded technology problem affecting an asset. |
| Branch Reporter | A staff member who reports issues for one assigned branch. |
| Support Coordinator | A support team member who triages and assigns incidents across branches. |
| Technician | A support team member who investigates incidents assigned to them. |
| Service activity | A record of on-site or remote work performed on an incident. |
| Repeat Fault Watch | A view of assets with at least three incidents in the previous rolling 30 days. |
| RLS | Row-Level Security: database policies that control which rows a user can read or change. |

# 18. Change log

| Version | Date | Change | Status |
|---|---|---|---|
| 0.1 | 4 Nov 2026 | Initial PRD draft prepared for Melsoft academic review. | Superseded |
| 0.2 | 4 Nov 2026 | Added explicit acceptance tests for disabled public registration, optional asset installation date, priority updates, technician progress notes and Repeat Fault Watch navigation. Aligned the security permission for priority updates and incident deletion. | Draft for academic review |
