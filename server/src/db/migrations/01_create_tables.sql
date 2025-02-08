create table public.locations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  latitude double precision not null,
  longitude double precision not null,
  timestamp timestamptz not null,
  created_at timestamptz default now() not null
);

create table public.tracks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  start_time timestamptz not null,
  end_time timestamptz,
  distance double precision default 0,
  created_at timestamptz default now() not null
);

-- Set up row level security
alter table public.locations enable row level security;
alter table public.tracks enable row level security;

-- Create policies
create policy "Users can insert their own locations"
  on locations for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own locations"
  on locations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tracks"
  on tracks for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own tracks"
  on tracks for select
  using (auth.uid() = user_id);

create policy "Users can update their own tracks"
  on tracks for update
  using (auth.uid() = user_id); 