-- 1. Create Priority Enum
-- This defines the allowed values for the priority column
create type todo_priority as enum ('low', 'medium', 'high');

-- 2. Create Todos Table
-- This table stores all the tasks
create table public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  description text,
  is_completed boolean default false,
  priority todo_priority default 'medium',
  due_date timestamptz,
  created_at timestamptz default now()
);

-- 3. Enable Security (RLS)
-- This ensures that Row Level Security is active
alter table public.todos enable row level security;

-- 4. Create Security Policies
-- These policies ensure users can ONLY see and edit their OWN data

-- Policy: Allow users to view their own todos
create policy "Users can see their own todos"
on public.todos for select
using ( auth.uid() = user_id );

-- Policy: Allow users to create their own todos
create policy "Users can insert their own todos"
on public.todos for insert
with check ( auth.uid() = user_id );

-- Policy: Allow users to update their own todos
create policy "Users can update their own todos"
on public.todos for update
using ( auth.uid() = user_id );

-- Policy: Allow users to delete their own todos
create policy "Users can delete their own todos"
on public.todos for delete
using ( auth.uid() = user_id );
