# Supabase setup for BranchPulse

1. Create a new Supabase project for the fictional Northline Retail Demo.
2. In Project Settings → API, copy the Project URL and anon/publishable key into local `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Apply `supabase/migrations/202611090001_branchpulse_schema.sql` (Supabase CLI: `npx supabase db reset` after linking/configuring the project).
4. In Authentication → Users, create four synthetic users for the four application roles. Use test-only passwords and fictional addresses such as `admin@northline.demo`, `coordinator@northline.demo`, `technician@northline.demo` and `reporter@northline.demo`.
5. Copy each Auth user's UUID. In the SQL Editor, insert the matching profiles. Example (replace UUIDs with the Auth user IDs and use the actual seeded branch UUID):

   ```sql
   insert into public.profiles(id, full_name, email, role, branch_id) values
   ('ADMIN-AUTH-UUID','Demo Administrator','admin@northline.demo','administrator',null),
   ('COORD-AUTH-UUID','Demo Coordinator','coordinator@northline.demo','support_coordinator',null),
   ('TECH-AUTH-UUID','Demo Technician','technician@northline.demo','technician',null),
   ('REPORTER-AUTH-UUID','Demo Branch Reporter','reporter@northline.demo','branch_reporter',
      (select id from public.branches where store_code='GP-MID-001'));
   ```
6. Run `supabase/demo_incidents.sql` in the SQL Editor to add fictional sample incidents, including a repeat-fault asset and a separate-branch incident.\n7. Deploy the staff function and set its secret:

   ```bash
   npx supabase functions deploy admin-manage-staff
   npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
   ```

8. Sign in through the application. When Supabase variables are present, the demo role switcher is removed and the application requires a real Supabase session.

Do not place a service-role key in `.env` values beginning with `VITE_`, frontend source, screenshots or GitHub. Do not use real staff or retailer data.
