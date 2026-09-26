# Backend Endpoint Check Report

Date checked: 2026-09-26

## Status summary

All checked backend endpoints are responding successfully from the running server. One route (`POST /api/games/:gameId/sessions`) is available and correctly returns validation/availability behavior, but it could not create a session during this test because there were no active games in the database at that time.

## Endpoints checked

- `GET /health` — Working
- `POST /api/auth/signup` — Working
- `POST /api/auth/login` — Working
- `POST /api/auth/refresh` — Working
- `POST /api/auth/logout` — Working
- `GET /api/users/me` — Working
- `GET /api/patients/profile` — Working
- `GET /api/games` — Working
- `POST /api/games/:gameId/sessions` — Working route; requires an active game in DB

## Notes

- The backend server was started successfully on `http://localhost:4000`.
- Database health check returned `OK` for `/health`.
- The `/api/games` route returned success with `0` active games, which means the route is reachable and functioning but the database currently has no active game records.
