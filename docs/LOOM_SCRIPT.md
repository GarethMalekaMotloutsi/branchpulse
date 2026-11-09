# BranchPulse — Loom walkthrough outline

## Introduction
"Hi, this is BranchPulse, a retail branch technology incident-management application. It gives branch staff one place to report equipment faults and gives support coordinators and technicians a shared view of assignment and resolution progress."

## Demonstration sequence
1. Introduce the Northline Retail Demo organisation and the three fictional Gauteng branches.
2. Show the incident register and its search/status filters.
3. In a configured Supabase demo, sign in as a Branch Reporter and submit a fault against an asset in the assigned branch.
4. Sign in as a Support Coordinator and assign the incident to an active Technician.
5. Sign in as the assigned Technician, move it to In Progress, record a service activity and resolve it with a summary of at least 10 characters.
6. Show Repeat Fault Watch and explain the three-incidents-in-30-days threshold.
7. Show the Supabase tables and the saved records.
8. Demonstrate a denied cross-branch or unassigned-technician request using separate Supabase test accounts.
9. Walk through the repository, PRD, implementation plan, migration, tests and README.

## Explain the build
Describe the original requirements, the phase-based plan, the main implementation decisions and any remaining limitations. Do not say the complete nine-phase plan passed if it did not. Distinguish the local demo role preview from real authentication and RLS.
