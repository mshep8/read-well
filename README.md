# READ. - Learn to Read App

## App Summary

READ. is a reading application designed to help illiterate adults learn to read. Adult literacy is a significant challenge—many adults struggle with basic reading skills, which limits their opportunities for employment, healthcare, and daily life. This app addresses that problem by providing structured, accessible lessons that build reading skills from the ground up. The primary users are adults who are beginning or rebuilding their literacy journey, often learning at their own pace in private. The product offers phonics-based lessons, sight word practice, sentence reading, and real-world document exercises. Users can track their progress, customize their experience (including display name and text size), and learn without judgment or time pressure.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, TypeScript, Vite, React Router, TanStack Query |
| **UI / Styling** | shadcn/ui, Radix UI, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | PostgreSQL |
| **Authentication** | None (single-user / device-local for vertical slice) |
| **External Services** | None |

## Architecture Diagram

```
┌─────────────┐         ┌─────────────────┐         ┌─────────────────┐
│             │  HTTP   │                 │  SQL   │                 │
│    User     │────────►│    Frontend     │        │    Backend      │
│  (Browser)  │◄────────│  (React/Vite)   │◄──────►│   (Express)     │
│             │  :8080  │                 │  :3001 │                 │
└─────────────┘         └────────┬────────┘        └────────┬────────┘
                                 │                          │
                                 │  /api/* proxied           │  pg client
                                 │  to backend              │
                                 │                          ▼
                                 │                 ┌─────────────────┐
                                 │                 │   PostgreSQL    │
                                 │                 │  (learn2read)   │
                                 │                 └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  localStorage   │
                        │  (profile, etc) │
                        └─────────────────┘
```

**Flow for Display Name (Vertical Slice):**
1. User edits name in Settings → Frontend sends `PATCH /api/users/1` with `{ name }`
2. Backend updates `Users.Name` in PostgreSQL
3. Frontend updates local state and localStorage
4. On page load, Frontend fetches `GET /api/users/1` to sync name from database

## Prerequisites

The following software must be installed and available in your system PATH:

| Software | Purpose | Verify | Install |
|----------|---------|--------|---------|
| **Node.js** (v18+) | Runtime for frontend and backend | `node --version` | [nodejs.org](https://nodejs.org/) |
| **npm** | Package manager | `npm --version` | Bundled with Node.js |
| **PostgreSQL** | Database | `psql --version` | [postgresql.org/download](https://www.postgresql.org/download/) |
| **psql** | PostgreSQL client (run schema/seed) | `psql --version` | Bundled with PostgreSQL |

## Installation and Setup

### 1. Clone the repository

```sh
git clone <YOUR_GIT_URL>
cd read-well
```

### 2. Install dependencies

```sh
npm run install:all
```

This installs dependencies for the root, frontend, and backend.

### 3. Create the database

Ensure PostgreSQL is running, then:

```sh
createdb learn2read
psql learn2read -f db/learn2read_creation.sql
psql learn2read -f db/lear2read_data.sql
```

- `learn2read_creation.sql` creates all tables (Users, Categories, Lessons, etc.)
- `lear2read_data.sql` seeds 4 users and sample data

### 4. Configure environment variables

```sh
cp backend/.env.example backend/.env
```

Edit `backend/.env` if needed. Default:

```
DATABASE_URL=postgresql://localhost:5432/learn2read
```

Use your PostgreSQL username and password if required, e.g.:

```
DATABASE_URL=postgresql://username:password@localhost:5432/learn2read
```

## Running the Application

### Start the backend

```sh
npm run dev:backend
```

Server runs at **http://localhost:3001**

### Start the frontend

In a separate terminal:

```sh
npm run dev:frontend
```

App runs at **http://localhost:8080**

### Open in browser

Navigate to **http://localhost:8080**

## Verifying the Vertical Slice

The vertical slice is **editing the display name in Settings** and having it persist in the database and across the app.

### Steps to verify

1. **Complete onboarding** (if first visit): Go to `/`, click through Welcome, enter a name on Onboarding, choose a starting level, and click "Start Learning".

2. **Open Settings**: Click the Settings (gear) icon in the bottom navigation, or go to `/settings`.

3. **Edit the display name**: Change the text in the "Display Name" field and click **Save**. The button should briefly show "Saved!".

4. **Confirm the database was updated**:
   ```sh
   psql learn2read -c 'SELECT "UserID", "Name" FROM "Users" WHERE "UserID" = 1;'
   ```
   You should see the updated name in the `Name` column.

5. **Verify persistence after refresh**: Refresh the page (F5 or Cmd+R). The display name should still show your updated value (loaded from the database and synced to the app).

6. **Verify it appears across the app**: Navigate to the Dashboard or other screens. The display name should be reflected wherever the profile name is used.
