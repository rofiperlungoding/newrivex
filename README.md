# Rivex

![Rivex Banner](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)

> A modern, high-performance personal portfolio and web application featuring a fully functional Enterprise Task Manager. Built with React, TypeScript, and Supabase.

## ✨ Features

### 🎨 Modern Portfolio
- **Glassmorphism Design**: sleek, translucent UI elements with background blur.
- **Bento Grid Layout**: Organized, responsive, and visually engaging content presentation.
- **Interactive Animations**: Powered by Framer Motion for a premium feel.
- **Responsive**: Flawless experience across all devices.

### 🚀 Enterprise Task Manager (New!)
A robust, real-time to-do application integrated directly into the platform.
- **Real-time Sync**: Changes update instantly across all devices using Supabase Realtime.
- **Secure Authentication**: User registration and login with strict data isolation (Row Level Security).
- **Smart Task Management**:
    - Priority levels (Low, Medium, High).
    - Smart Date & Time Picker.
    - Dashboard Statistics (Active vs Completed).
- **Optimistic UI**: Instant feedback for user actions.

## 🛠️ Tech Stack

- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Realtime)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/rofiperlungoding/newrivex.git
    cd newrivex
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup**
    Run the following SQL in your Supabase SQL Editor to set up the tables and security policies:

    ```sql
    -- 1. Create Priority Enum
    create type todo_priority as enum ('low', 'medium', 'high');

    -- 2. Create Todos Table
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
    alter table public.todos enable row level security;

    -- 4. Create Security Policies
    create policy "Users can see their own todos"
    on public.todos for select using ( auth.uid() = user_id );

    create policy "Users can insert their own todos"
    on public.todos for insert with check ( auth.uid() = user_id );

    create policy "Users can update their own todos"
    on public.todos for update using ( auth.uid() = user_id );

    create policy "Users can delete their own todos"
    on public.todos for delete using ( auth.uid() = user_id );
    ```

5.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Rivex Team](https://github.com/rofiperlungoding)
