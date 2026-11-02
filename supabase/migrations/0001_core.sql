-- Fase de persistencia: ejecutar solamente en un proyecto Supabase autorizado.
create extension if not exists pgcrypto;

create type public.vote_status as enum ('active', 'void', 'blocked', 'deleted');
create type public.app_role as enum ('participant', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'participant',
  locality_id text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clubs (
  id uuid primary key default gen_random_uuid(), slug text not null unique,
  official_name text not null, short_name text not null, country_code char(2) not null,
  source text not null default 'local', external_id text null, active boolean not null default true,
  synced_at timestamptz null, created_at timestamptz not null default now(),
  unique (source, external_id)
);
create table public.club_aliases (
  id uuid primary key default gen_random_uuid(), club_id uuid not null references public.clubs(id) on delete cascade,
  alias text not null, normalized_alias text not null unique
);
create table public.provinces (id text primary key, name text not null unique, source text not null default 'ign');
create table public.localities (
  id text primary key, province_id text not null references public.provinces(id), name text not null,
  municipality_name text null, normalized_name text not null, source text not null default 'georef',
  unique (province_id, normalized_name, municipality_name)
);
create table public.votes (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  club_id uuid not null references public.clubs(id), locality_id text not null references public.localities(id),
  status public.vote_status not null default 'active', created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(), voided_at timestamptz null
);
create unique index votes_one_active_per_account on public.votes(user_id) where status = 'active';
create index votes_active_locality_club on public.votes(locality_id, club_id) where status = 'active';
create index localities_province_name on public.localities(province_id, normalized_name);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  policy_version text not null, accepted_at timestamptz not null default now(), unique(user_id, policy_version)
);
create table public.admin_audit_events (
  id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id) on delete set null,
  action text not null, entity_type text not null, entity_id text not null, created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.votes enable row level security;
alter table public.consent_records enable row level security;
create policy "perfil propio" on public.profiles for select using (auth.uid() = id);
create policy "votos propios" on public.votes for select using (auth.uid() = user_id);
create policy "consentimientos propios" on public.consent_records for select using (auth.uid() = user_id);

-- No hay policy de insert/update para votes: se habilitará únicamente mediante una RPC
-- SECURITY DEFINER revisada, que toma auth.uid() del servidor y aplica la unicidad.
