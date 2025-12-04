-- ========================================
-- EXPENSE TRACKER SCHEMA FOR SUPABASE
-- Run this in your Supabase SQL Editor
-- ========================================

-- 1. Create Enums
create type expense_category as enum ('Travel', 'Food', 'Office', 'Software', 'Marketing', 'Equipment', 'Other');
create type expense_status as enum ('Pending', 'Approved', 'Rejected', 'Paid');
create type notification_type as enum ('info', 'warning', 'success', 'error');

-- 2. Create Expenses Table
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null default auth.uid(),
  date timestamptz not null default now(),
  merchant text not null,
  amount numeric not null,
  currency text default 'IDR',
  category expense_category not null default 'Other',
  description text,
  status expense_status default 'Pending',
  receipt_url text,
  requested_by text,
  project text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Create Budgets Table
create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null default auth.uid(),
  category expense_category not null,
  budget_limit numeric not null default 0,
  spent numeric not null default 0,
  period text not null default 'December 2025',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, category, period)
);

-- 4. Create Expense Notifications Table
create table public.expense_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  message text not null,
  date timestamptz default now(),
  read boolean default false,
  type notification_type default 'info',
  created_at timestamptz default now()
);

-- 5. Enable Row Level Security (RLS)
alter table public.expenses enable row level security;
alter table public.budgets enable row level security;
alter table public.expense_notifications enable row level security;

-- 6. RLS Policies for Expenses
create policy "Users can view their own expenses"
on public.expenses for select
using ( auth.uid() = user_id );

create policy "Users can insert their own expenses"
on public.expenses for insert
with check ( auth.uid() = user_id );

create policy "Users can update their own expenses"
on public.expenses for update
using ( auth.uid() = user_id );

create policy "Users can delete their own expenses"
on public.expenses for delete
using ( auth.uid() = user_id );

-- 7. RLS Policies for Budgets
create policy "Users can view their own budgets"
on public.budgets for select
using ( auth.uid() = user_id );

create policy "Users can insert their own budgets"
on public.budgets for insert
with check ( auth.uid() = user_id );

create policy "Users can update their own budgets"
on public.budgets for update
using ( auth.uid() = user_id );

create policy "Users can delete their own budgets"
on public.budgets for delete
using ( auth.uid() = user_id );

-- 8. RLS Policies for Notifications
create policy "Users can view their own notifications"
on public.expense_notifications for select
using ( auth.uid() = user_id );

create policy "Users can insert their own notifications"
on public.expense_notifications for insert
with check ( auth.uid() = user_id );

create policy "Users can update their own notifications"
on public.expense_notifications for update
using ( auth.uid() = user_id );

create policy "Users can delete their own notifications"
on public.expense_notifications for delete
using ( auth.uid() = user_id );

-- 9. Function to update 'updated_at' timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 10. Triggers for updated_at
create trigger update_expenses_updated_at
before update on public.expenses
for each row execute function update_updated_at_column();

create trigger update_budgets_updated_at
before update on public.budgets
for each row execute function update_updated_at_column();

-- 11. Function to initialize default budgets for new users
create or replace function initialize_user_budgets()
returns trigger as $$
begin
  insert into public.budgets (user_id, category, budget_limit, spent, period)
  values
    (new.id, 'Travel', 10000000, 0, to_char(now(), 'Month YYYY')),
    (new.id, 'Food', 2000000, 0, to_char(now(), 'Month YYYY')),
    (new.id, 'Office', 3000000, 0, to_char(now(), 'Month YYYY')),
    (new.id, 'Software', 5000000, 0, to_char(now(), 'Month YYYY')),
    (new.id, 'Marketing', 15000000, 0, to_char(now(), 'Month YYYY')),
    (new.id, 'Equipment', 10000000, 0, to_char(now(), 'Month YYYY')),
    (new.id, 'Other', 1000000, 0, to_char(now(), 'Month YYYY'));
  return new;
end;
$$ language plpgsql security definer;

-- Note: Run this manually after creating a user if trigger doesn't exist:
-- select initialize_user_budgets() -- you'd need to call it differently

-- 12. Enable Realtime for these tables (run in Supabase Dashboard > Database > Replication)
-- Or uncomment below if your Supabase version supports it:
-- alter publication supabase_realtime add table expenses;
-- alter publication supabase_realtime add table budgets;
-- alter publication supabase_realtime add table expense_notifications;
