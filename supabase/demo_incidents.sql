-- Run after creating the four synthetic Auth users and matching public.profiles rows.
-- Uses only fictional Northline Retail Demo data.
with ids as (
 select
  (select id from public.profiles where email='reporter@northline.demo' limit 1) reporter_id,
  (select id from public.profiles where email='technician@northline.demo' limit 1) technician_id,
  (select id from public.profiles where email='coordinator@northline.demo' limit 1) coordinator_id,
  (select id from public.branches where store_code='GP-MID-001' limit 1) mid_branch,
  (select id from public.branches where store_code='GP-SAN-002' limit 1) sandton_branch,
  (select id from public.assets where asset_tag='AST-1001' limit 1) scanner,
  (select id from public.assets where asset_tag='AST-1002' limit 1) printer,
  (select id from public.assets where asset_tag='AST-2001' limit 1) workstation
)
insert into public.incidents(branch_id,asset_id,reported_by,assigned_to,title,description,category,priority,status,created_at,updated_at)
select mid_branch,scanner,reporter_id,technician_id,'Scanner disconnects from Wi-Fi','The front desk scanner disconnects several times during the shift.','scanner','High','In Progress',now()-interval '1 day',now()-interval '1 day' from ids
where reporter_id is not null and technician_id is not null and mid_branch is not null and scanner is not null
and not exists(select 1 from public.incidents where title='Scanner disconnects from Wi-Fi' and asset_id=ids.scanner);

with ids as (
 select (select id from public.profiles where email='reporter@northline.demo' limit 1) reporter_id,
 (select id from public.profiles where email='technician@northline.demo' limit 1) technician_id,
 (select id from public.branches where store_code='GP-MID-001' limit 1) mid_branch,
 (select id from public.assets where asset_tag='AST-1001' limit 1) scanner,
 (select id from public.assets where asset_tag='AST-1002' limit 1) printer
)
insert into public.incidents(branch_id,asset_id,reported_by,assigned_to,title,description,category,priority,status,created_at,updated_at)
select mid_branch,scanner,reporter_id,technician_id,'Scanner pairing failure','Scanner needs repeated pairing during operation.','scanner','Medium','Resolved',now()-interval '8 days',now()-interval '8 days' from ids
where reporter_id is not null and mid_branch is not null and scanner is not null
and not exists(select 1 from public.incidents where title='Scanner pairing failure' and asset_id=ids.scanner);

with ids as (
 select (select id from public.profiles where email='reporter@northline.demo' limit 1) reporter_id,
 (select id from public.profiles where email='technician@northline.demo' limit 1) technician_id,
 (select id from public.branches where store_code='GP-MID-001' limit 1) mid_branch,
 (select id from public.assets where asset_tag='AST-1001' limit 1) scanner,
 (select id from public.assets where asset_tag='AST-1002' limit 1) printer,
 (select id from public.profiles where email='coordinator@northline.demo' limit 1) coordinator_id,
 (select id from public.branches where store_code='GP-SAN-002' limit 1) sandton_branch,
 (select id from public.assets where asset_tag='AST-2001' limit 1) workstation
)
insert into public.incidents(branch_id,asset_id,reported_by,assigned_to,title,description,category,priority,status,created_at,updated_at)
select mid_branch,scanner,reporter_id,technician_id,'Intermittent scan response','Delayed barcode scan response has been reported again.','scanner','Low','Resolved',now()-interval '15 days',now()-interval '15 days' from ids
where reporter_id is not null and mid_branch is not null and scanner is not null
and not exists(select 1 from public.incidents where title='Intermittent scan response' and asset_id=ids.scanner);

with ids as (
 select (select id from public.profiles where email='reporter@northline.demo' limit 1) reporter_id,
 (select id from public.branches where store_code='GP-MID-001' limit 1) mid_branch,
 (select id from public.assets where asset_tag='AST-1002' limit 1) printer
)
insert into public.incidents(branch_id,asset_id,reported_by,title,description,category,priority,status)
select mid_branch,printer,reporter_id,'Printer not producing receipts','Print jobs remain queued and nothing comes out.','printer','Urgent','New' from ids
where reporter_id is not null and mid_branch is not null and printer is not null
and not exists(select 1 from public.incidents where title='Printer not producing receipts' and asset_id=ids.printer);

-- Separate-branch record used to demonstrate that the Midrand Branch Reporter cannot read Sandton records.
with ids as (
 select (select id from public.profiles where email='coordinator@northline.demo' limit 1) coordinator_id,
 (select id from public.profiles where email='technician@northline.demo' limit 1) technician_id,
 (select id from public.branches where store_code='GP-SAN-002' limit 1) sandton_branch,
 (select id from public.assets where asset_tag='AST-2001' limit 1) workstation
)
insert into public.incidents(branch_id,asset_id,reported_by,assigned_to,title,description,category,priority,status,created_at,updated_at)
select sandton_branch,workstation,coordinator_id,technician_id,'Sandton workstation network fault','Workstation intermittently loses network access.','workstation','Medium','Assigned',now()-interval '2 days',now()-interval '2 days' from ids
where coordinator_id is not null and technician_id is not null and sandton_branch is not null and workstation is not null
and not exists(select 1 from public.incidents where title='Sandton workstation network fault' and asset_id=ids.workstation);
