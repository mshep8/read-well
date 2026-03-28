# READ. Project Plan (Current State)

Last updated: March 28, 2026

## 1) Completed Work

- Added backend authentication routes:
  - `POST /api/auth/register` (stores username + hashed password)
  - `POST /api/auth/login` (verifies password hash)
- Standardized app identity to username only (no separate display-name model).
- Enforced unique usernames at DB level via `Users.Name` uniqueness in schema.
- Built registration and login screens in the frontend.
- Updated welcome flow so users must sign up or log in first.
- Added protected routing so direct URL access redirects unauthenticated users back to welcome with "Please login or sign up".
- Removed post-registration onboarding questions; registration now goes straight to dashboard.
- Added backend progress APIs:
  - `GET /api/users/:id/progress`
  - `PUT /api/users/:id/progress/:lessonId`
  - `DELETE /api/users/:id/progress`
- Added backend lesson mapping route:
  - `GET /api/lessons` to map DB lesson rows to frontend lesson IDs (`phonics-*`, `sight-*`, `sentence-*`, `real-world-*`).
- Hooked frontend progress to DB:
  - Lesson completion writes to DB.
  - Progress rehydrates from DB on login.
  - Reset progress clears DB progress for current user.
- Synced DB lesson inventory to frontend lesson set:
  - 4 categories x 5 topics = 20 lessons.
  - Removed old `Stem/Biology` sample rows and example users from seed/data.

## 2) Current Architecture Decisions

- Authentication state is currently client-managed (profile in localStorage) with backend credential validation.
- Lesson content (text/questions) remains in frontend code for now.
- Lesson inventory/progress ownership is in PostgreSQL.
- `db/learn2read_creation.sql` is schema.
- `db/lear2read_data.sql` is lesson inventory seed and must stay aligned with `frontend/src/lib/lessonData.ts`.

## 3) Cleanup Completed

- Removed obsolete onboarding route/page flow.
- Removed unused placeholder page file.
- Removed one-off username migration SQL file that is no longer needed.

## 4) Next Recommended Steps

- Move full lesson content into DB tables if multi-client/shared-content editing is needed.
- Add true backend session/JWT auth (instead of frontend-only gate via local profile) for stronger access control.
- Add backend-backed "current user" lookup endpoint and logout/session invalidation flow.
- Add integration tests for:
  - register/login
  - progress write/read cycle across logout/login
  - lesson mapping correctness (`sight-*` and `sentence-*` IDs).
