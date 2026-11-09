# BranchPulse

**Retail Branch Technology and Incident Management System**

BranchPulse is a web-based application designed to help retail organisations manage technology incidents across multiple branches. It provides a central place to report technical problems, monitor affected equipment, coordinate technicians and identify recurring faults.

The project was developed as part of the Melsoft Academy learning programme.

## Project Overview

Retail branches rely on technology such as barcode scanners, printers, workstations and network equipment to operate efficiently. When these devices experience problems, resolving the issue requires clear communication, proper incident records and visibility into the support process.

BranchPulse aims to simplify this process by bringing incident reporting, equipment records, technician assignments and operational information into one platform.

## Main Features

- **Operations Dashboard:** View incident totals, urgent issues, technician assignments and recurring equipment faults.
- **Incident Management:** Report, view and manage technical incidents.
- **Technician Workflow:** Support incident assignment, progress tracking and resolution records.
- **Asset Management:** Maintain records of technology equipment used across branches.
- **Branch Management:** View and organise retail branch information.
- **Staff Management:** Provide an interface for managing staff members and their roles.
- **Repeat Fault Watch:** Highlight equipment experiencing three or more incidents within a rolling 30-day period.
- **Responsive Interface:** Designed to work across desktop and smaller screens.

## User Roles

The application is designed around four operational roles:

| Role | Responsibility |
|---|---|
| Administrator | Oversees the platform, staff and operational configuration |
| Support Coordinator | Reviews incidents and coordinates technical support |
| Technician | Works on assigned incidents and records progress |
| Branch Reporter | Reports technical issues affecting branch operations |

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase (planned backend integration)
- Lucide React
- Vitest
- React Testing Library

## Getting Started

### Requirements

- Node.js 26.x
- npm
- Git
- Visual Studio Code or another suitable code editor

### Installation

Clone the repository:

```bash
git clone https://github.com/GarethMalekaMotloutsi/branchpulse.git
```

Navigate into the project:

```bash
cd branchpulse
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address provided by Vite, normally:

```text
http://localhost:5173
```

## Environment Configuration

The project includes an `.env.example` file.

For a local demo, the application can run without connecting a Supabase project.

To configure a Supabase environment, create a `.env` file using the example configuration and supply your own project credentials:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never commit private service-role keys or other secrets to the repository.

## Project Structure

```text
branchpulse/
├── docs/
│   ├── BranchPulse_PRD.md
│   ├── BranchPulse_IMPLEMENTATION_PLAN.md
│   └── other project documentation
├── src/
│   ├── lib/
│   ├── App.tsx
│   ├── styles.css
│   └── test-setup.ts
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
├── tests/
│   ├── components/
│   └── unit/
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

## Current Implementation Status

The current version provides a functional demonstration of the main application interface and incident-management workflows.

The dashboard, demo incident data, navigation and core demonstration interactions are available.

The following work remains subject to verification and completion:

- Supabase database connection and persistent data storage.
- Production authentication and role-based security verification.
- Automated test configuration and successful execution of the complete test suite.
- Production deployment and live environment verification.

The demonstration role selector is intended for preview purposes. It should not be treated as production authentication or a security boundary.

## Testing

The project includes automated tests using Vitest and React Testing Library.

Run the test suite:

```bash
npm run test
```

Run the project checks:

```bash
npm run check
```

The automated test configuration is still being finalised. A successful browser demonstration should not be interpreted as confirmation that all automated tests have passed.

## Future Improvements

- Complete Supabase integration.
- Strengthen authentication and access controls.
- Complete automated unit and component testing.
- Improve reporting and operational analytics.
- Complete production deployment.
- Extend technician service-history functionality.

## Project Documentation

The repository includes the Product Requirements Document (PRD) and Implementation Plan. These documents describe the intended scope, workflows, technical approach and development requirements.

## Repository

[BranchPulse – GitHub](https://github.com/GarethMalekaMotloutsi/branchpulse)

---

**BranchPulse | Melsoft Academy Project**