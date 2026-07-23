-- Marketing leads: captures email + explicit marketing consent at signup.
-- Populated by a trigger on auth.users so it works even when the user must
-- confirm their email before a session exists. GDPR/PDPA: consent is stored
-- explicitly and defaults to false (opt-in, never opt-out).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  marketing_consent boolean not null default false,
  source text not null default 'signup',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Authenticated users may read only their own lead row. There are deliberately
-- no INSERT/UPDATE/DELETE policies for anon/authenticated: rows are written
-- solely by the SECURITY DEFINER trigger below (which runs as the table owner
-- and bypasses RLS). The marketing team reads the table via the service role /
-- Supabase dashboard, which also bypasses RLS.
drop policy if exists "leads_select_own" on public.leads;
create policy "leads_select_own"
  on public.leads for select
  to authenticated
  using ((select auth.uid()) = user_id);

grant select on public.leads to authenticated;

-- Trigger function: copy each new auth user into public.leads. SECURITY DEFINER
-- is required to insert into public.leads from the auth insert path. It is kept
-- minimal, pins an empty search_path, and has EXECUTE revoked from callable
-- roles so it is not usable as an ad-hoc public endpoint.
create or replace function public.handle_new_user_lead()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.leads (user_id, email, full_name, marketing_consent, source)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce((new.raw_user_meta_data ->> 'marketing_consent')::boolean, false),
    'signup'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user_lead() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_lead on auth.users;
create trigger on_auth_user_created_lead
  after insert on auth.users
  for each row execute function public.handle_new_user_lead();
