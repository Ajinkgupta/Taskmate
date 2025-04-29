# TaskMate - Task Management Application

TaskMate is a web application designed to help users manage their tasks efficiently. It provides features for creating, viewing, updating, and deleting tasks, along with user authentication.

## Features

*   **User Authentication:** Secure user registration and login using Supabase Auth.
*   **Task Management:** Create, read, update (mark as complete/incomplete), and delete tasks.
*   **Task Prioritization:** Assign priority levels (Low, Medium, High) to tasks.
*   **Task Filtering:** Filter tasks by status (All, Active, Completed).
*   **Real-time Updates:** Task list updates in real-time using Supabase subscriptions.
*   **Responsive Design:** Styled with Tailwind CSS for a consistent experience across devices.

## Tech Stack

*   **Frontend:**
    *   [React](https://reactjs.org/)  
    *   [Vite](https://vitejs.dev/)
    *   [React Router DOM](https://reactrouter.com/) (v7) for routing
    *   [Tailwind CSS](https://tailwindcss.com/) for styling
    *   [Heroicons](https://heroicons.com/) for icons
    *   [Headless UI](https://headlessui.com/) (Potentially for accessible UI components, though usage isn't explicit in provided files)
*   **Backend:**
    *   [Supabase](https://supabase.io/)
        *   Authentication
        *   PostgreSQL Database
        *   Realtime Subscriptions
*   **Linting:**
    *   [ESLint](https://eslint.org/)

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Image assets
│   ├── components/     # Reusable React components (Header, TaskForm, TaskItem, TaskList)
│   ├── hooks/          # Custom React hooks (useTasks)
│   ├── lib/            # Supabase client setup (supabaseClient.js)
│   ├── pages/          # Page components (Dashboard, Login, Register)
│   ├── App.jsx         # Main application component with routing
│   ├── main.jsx        # Entry point of the React application
│   ├── index.css       # Global CSS and Tailwind directives
│   └── App.css         # Component-specific styles (if any)
├── .env                # Environment variables (Supabase keys) - **DO NOT COMMIT**
├── .gitignore          # Git ignore rules
├── eslint.config.js    # ESLint configuration
├── index.html          # Main HTML entry point
├── package.json        # Project dependencies and scripts
├── postcss.config.cjs  # PostCSS configuration (for Tailwind)
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── supabase-setup.sql  # SQL script for setting up the Supabase 'tasks' table
```

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Taskmate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Supabase:**
    *   Create a new project on [Supabase](https://supabase.io/).
    *   In your Supabase project dashboard, go to the SQL Editor.
    *   Run the contents of `supabase-setup.sql` to create the `tasks` table and enable Row Level Security (RLS).
    *   Go to Project Settings > API.
    *   Find your Project URL and `anon` public key.

4.  **Configure Environment Variables:**
    *   Create a `.env` file in the root of the project.
    *   Add your Supabase URL and Anon Key:
        ```env
        VITE_REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
        VITE_REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```
    *   **Important:** Ensure `.env` is listed in your `.gitignore` file to avoid committing sensitive keys.

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    The application should now be running on `http://localhost:5173` (or another port specified by Vite).

## Available Scripts

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

## Workflow

1.  **Registration/Login:** Users access the `/register` or `/login` routes. Supabase handles authentication.
2.  **Dashboard:** Upon successful login, users are redirected to the main dashboard (`/`).
3.  **Task Fetching:** The `Dashboard` component uses the `useTasks` hook to fetch tasks associated with the logged-in user from the Supabase database.
4.  **Displaying Tasks:** Tasks are displayed using the `TaskList` and `TaskItem` components.
5.  **Adding Tasks:** Users can add new tasks via the `TaskForm` component. The `useTasks` hook handles adding the task to Supabase and updating the local state.
6.  **Updating/Deleting Tasks:** Users can mark tasks as complete or delete them. These actions trigger functions within the `useTasks` hook to update or delete records in Supabase.
7.  **Real-time Updates:** The `useTasks` hook subscribes to changes in the Supabase `tasks` table, ensuring the UI updates automatically when tasks are added, updated, or deleted by the current user (or potentially other clients, depending on RLS policies).
