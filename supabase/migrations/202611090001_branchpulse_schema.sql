-- BranchPulse schema and security baseline. Apply with Supabase CLI.
create extension if not exists pgcrypto;

create table if not exists public.branches (
 id uuid primary key default gen_random_uuid(),
 store_code text not null unique,
 name text not null check (length(trim(name))>0),
 province text not null check (length(trim(province))>0),
 city text not null check (length(trim(city))>0),
 address text,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete restrict,
 full_name text not null check(length(trim(full_name))>0),
 email text not null unique,
 role text not null check(role in ('administrator','support_coordinator','technician','branch_reporter')),
 branch_id uuid references public.branches(id) on delete restrict,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 constraint reporter_requires_branch check(role <> 'branch_reporter' or branch_id is not null)
);
create table if not exists public.assets (
 id uuid primary key default gen_random_uuid(),
 branch_id uuid not null references public.branches(id) on delete restrict,
 asset_tag text not null unique,
 display_name text not null check(length(trim(display_name))>0),
 category text not null check(category in ('scanner','printer','pos_terminal','workstation','network_device','other')),
 manufacturer text, model text, serial_number text, installation_date date,
 is_active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(id,branch_id)
);
create table if not exists public.incidents (
 id uuid primary key default gen_random_uuid(),
 branch_id uuid not null references public.branches(id) on delete restrict,
 asset_id uuid not null references public.assets(id) on delete restrict,
 reported_by uuid not null references public.profiles(id) on delete restrict,
 assigned_to uuid references public.profiles(id) on delete restrict,
 title text not null check(length(trim(title))>0),
 description text not null check(length(trim(description))>0),
 category text not null check(category in ('network','printer','scanner','pos','workstation','software','other')),
 priority text not null check(priority in ('Low','Medium','High','Urgent')),
 status text not null default 'New' check(status in ('New','Assigned','In Progress','Resolved')),
 resolution_summary text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint asset_branch_match foreign key(asset_id,branch_id) references public.assets(id,branch_id) deferrable initially immediate
);
create table if not exists public.incident_updates (
 id uuid primary key default gen_random_uuid(),
 incident_id uuid not null references public.incidents(id) on delete restrict,
 author_id uuid not null references public.profiles(id) on delete restrict,
 note text not null check(length(trim(note))>0),
 created_at timestamptz not null default now()
);
create table if not exists public.technician_visits (
 id uuid primary key default gen_random_uuid(),
 incident_id uuid not null references public.incidents(id) on delete restrict,
 technician_id uuid not null references public.profiles(id) on delete restrict,
 activity_type text not null check(activity_type in ('on_site','remote')),
 activity_date timestamptz not null,
 outcome text not null check(length(trim(outcome))>0),
 time_spent_minutes integer not null check(time_spent_minutes>0),
 created_at timestamptz not null default now()
);
create table if not exists public.incident_status_history (
 id uuid primary key default gen_random_uuid(),
 incident_id uuid not null references public.incidents(id) on delete restrict,
 old_status text, new_status text not null,
 changed_by uuid references public.profiles(id) on delete restrict,
 changed_at timestamptz not null default now()
);

create index if not exists idx_assets_branch on public.assets(branch_id);
create index if not exists idx_incidents_branch on public.incidents(branch_id);
create index if not exists idx_incidents_assigned on public.incidents(assigned_to);
create index if not exists idx_incidents_asset_date on public.incidents(asset_id,created_at desc);
create index if not exists idx_updates_incident on public.incident_updates(incident_id,created_at);
create index if not exists idx_visits_incident on public.technician_visits(incident_id,activity_date);

create or replace function public.current_role() returns text language sql stable security definer set search_path=public as $$
 select role from public.profiles where id=auth.uid() and is_active=true limit 1;
$$;
create or replace function public.current_branch() returns uuid language sql stable security definer set search_path=public as $$
 select branch_id from public.profiles where id=auth.uid() and is_active=true limit 1;
$$;
create or replace function public.is_active_user() returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.profiles where id=auth.uid() and is_active=true);
$$;
create or replace function public.log_incident_status() returns trigger language plpgsql security definer set search_path=public as $$
 begin
  if old.status is distinct from new.status then
   insert into public.incident_status_history(incident_id,old_status,new_status,changed_by)
   values(new.id,old.status,new.status,auth.uid());
  end if;
  new.updated_at=now();
  return new;
 end;
$$;
create or replace function public.guard_incident_update() returns trigger
language plpgsql security definer set search_path=public as $$
declare r text;
begin
 r:=public.current_role();
 if r in ('administrator','support_coordinator') then
  if (to_jsonb(new)-'priority'-'assigned_to'-'status'-'updated_at') is distinct from (to_jsonb(old)-'priority'-'assigned_to'-'status'-'updated_at') then
   raise exception 'Only priority and assignment fields may be changed by support coordination';
  end if;
  if new.assigned_to is distinct from old.assigned_to or new.status is distinct from old.status then
   if new.status <> 'Assigned' or new.assigned_to is null then raise exception 'Assignment must set an active Technician and Assigned status'; end if;
   if not exists(select 1 from public.profiles p where p.id=new.assigned_to and p.role='technician' and p.is_active=true) then
    raise exception 'Select an active Technician';
   end if;
  end if;
 elsif r='technician' and old.assigned_to=auth.uid() then
  if (to_jsonb(new)-'status'-'resolution_summary'-'updated_at') is distinct from (to_jsonb(old)-'status'-'resolution_summary'-'updated_at') then
   raise exception 'Technicians may only change status and resolution summary';
  end if;
  if not ((old.status='Assigned' and new.status='In Progress') or (old.status='In Progress' and new.status='Resolved')) then
   raise exception 'Invalid status transition';
  end if;
  if new.status='Resolved' and length(trim(coalesce(new.resolution_summary,'')))<10 then
   raise exception 'Resolution summary must be at least 10 characters';
  end if;
 else
  raise exception 'Access denied';
 end if;
 return new;
end $$;
drop trigger if exists trg_guard_incident_update on public.incidents;
create trigger trg_guard_incident_update before update on public.incidents for each row execute function public.guard_incident_update();

drop trigger if exists trg_incident_status on public.incidents;
create trigger trg_incident_status before update on public.incidents for each row execute function public.log_incident_status();

create or replace function public.assign_incident(p_incident_id uuid,p_technician_id uuid) returns void
language plpgsql security definer set search_path=public as $$
declare target_role text; target_active boolean;
begin
 if public.current_role() not in ('administrator','support_coordinator') then raise exception 'Access denied'; end if;
 select role,is_active into target_role,target_active from public.profiles where id=p_technician_id;
 if target_role <> 'technician' or target_active is distinct from true then raise exception 'Select an active Technician'; end if;
 update public.incidents set assigned_to=p_technician_id,status='Assigned',updated_at=now() where id=p_incident_id;
 if not found then raise exception 'Incident not found'; end if;
end $$;

create or replace function public.change_incident_status(p_incident_id uuid,p_new_status text,p_resolution_summary text default null) returns void
language plpgsql security definer set search_path=public as $$
declare current_status text; assigned uuid;
begin
 select status,assigned_to into current_status,assigned from public.incidents where id=p_incident_id for update;
 if assigned is distinct from auth.uid() or public.current_role()<>'technician' then raise exception 'Access denied'; end if;
 if not ((current_status='Assigned' and p_new_status='In Progress') or (current_status='In Progress' and p_new_status='Resolved')) then raise exception 'Invalid status transition'; end if;
 if p_new_status='Resolved' and length(trim(coalesce(p_resolution_summary,'')))<10 then raise exception 'Resolution summary must be at least 10 characters'; end if;
 update public.incidents set status=p_new_status,resolution_summary=case when p_new_status='Resolved' then p_resolution_summary else resolution_summary end where id=p_incident_id;
end $$;

create or replace view public.repeat_fault_watch with (security_invoker=true) as
 select a.id asset_id,a.asset_tag,a.display_name,a.branch_id,count(i.id)::int incident_count
 from public.assets a join public.incidents i on i.asset_id=a.id
 where i.created_at >= now()-interval '30 days'
 group by a.id,a.asset_tag,a.display_name,a.branch_id
 having count(i.id)>=3;

alter table public.branches enable row level security;
alter table public.profiles enable row level security;
alter table public.assets enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_updates enable row level security;
alter table public.technician_visits enable row level security;
alter table public.incident_status_history enable row level security;

create policy "profiles self or admin read" on public.profiles for select using (id=auth.uid() or public.current_role()='administrator');
create policy "branches permitted read" on public.branches for select using (
 public.current_role() in ('administrator','support_coordinator') or (public.current_role()='branch_reporter' and id=public.current_branch()) or
 (public.current_role()='technician' and exists(select 1 from public.incidents i where i.branch_id=branches.id and i.assigned_to=auth.uid()))
);
create policy "branches admin insert" on public.branches for insert with check(public.current_role()='administrator');
create policy "branches admin update" on public.branches for update using(public.current_role()='administrator') with check(public.current_role()='administrator');
create policy "assets permitted read" on public.assets for select using (
 public.current_role() in ('administrator','support_coordinator') or
 (public.current_role()='branch_reporter' and branch_id=public.current_branch()) or
 (public.current_role()='technician' and exists(select 1 from public.incidents i where i.asset_id=assets.id and i.assigned_to=auth.uid()))
);
create policy "assets coordinator insert" on public.assets for insert with check(public.current_role() in ('administrator','support_coordinator'));
create policy "assets coordinator update" on public.assets for update using(public.current_role() in ('administrator','support_coordinator')) with check(public.current_role() in ('administrator','support_coordinator'));
create policy "incidents scoped read" on public.incidents for select using (
 public.current_role() in ('administrator','support_coordinator') or
 (public.current_role()='branch_reporter' and branch_id=public.current_branch()) or
 (public.current_role()='technician' and assigned_to=auth.uid())
);
create policy "reporter creates own branch incident" on public.incidents for insert with check (
 public.current_role()='branch_reporter' and reported_by=auth.uid() and branch_id=public.current_branch()
 and assigned_to is null and status='New' and resolution_summary is null
 and exists(select 1 from public.assets a where a.id=asset_id and a.branch_id=public.current_branch() and a.is_active=true)
);
create policy "coordinator priority update" on public.incidents for update using(public.current_role() in ('administrator','support_coordinator')) with check(public.current_role() in ('administrator','support_coordinator'));
create policy "assigned technician update" on public.incidents for update using(public.current_role()='technician' and assigned_to=auth.uid()) with check(public.current_role()='technician' and assigned_to=auth.uid());
create policy "updates scoped read" on public.incident_updates for select using(exists(select 1 from public.incidents i where i.id=incident_id));
create policy "assigned technician adds updates" on public.incident_updates for insert with check(author_id=auth.uid() and exists(select 1 from public.incidents i where i.id=incident_id and i.assigned_to=auth.uid()));
create policy "visits scoped read" on public.technician_visits for select using(exists(select 1 from public.incidents i where i.id=incident_id));
create policy "assigned technician adds visit" on public.technician_visits for insert with check(technician_id=auth.uid() and exists(select 1 from public.incidents i where i.id=incident_id and i.assigned_to=auth.uid() and i.status='In Progress'));
create policy "history scoped read" on public.incident_status_history for select using(exists(select 1 from public.incidents i where i.id=incident_id));
revoke all on public.incident_status_history from anon,authenticated;
grant select on public.incident_status_history to authenticated;
grant select on public.repeat_fault_watch to authenticated;

-- Staff creation is intentionally not available from the browser. Configure a JWT-verified
-- Supabase Edge Function and service-role secret for Administrator-only account provisioning.

revoke all on function public.assign_incident(uuid,uuid) from public, anon;
revoke all on function public.change_incident_status(uuid,text,text) from public, anon;
grant execute on function public.assign_incident(uuid,uuid) to authenticated;
grant execute on function public.change_incident_status(uuid,text,text) to authenticated;
