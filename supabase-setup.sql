-- Create tasks table
create table tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  status boolean default false,
  priority text check (priority in ('Low', 'Medium', 'High')) default 'Low',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable Row Level Security
alter table tasks enable row level security;

-- Create policy for tasks
create policy "Users can access own tasks"
  on tasks
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Optional: Create some example tasks (replace USER-UUID with your user's UUID after signing up)
-- insert into tasks (user_id, title, description, status, priority)
-- values
--   ('USER-UUID', 'Learn React', 'Complete React tutorial', false, 'High'),
--   ('USER-UUID', 'Build Todo App', 'Create a todo app with React', false, 'Medium');
