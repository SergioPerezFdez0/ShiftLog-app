# ShiftLog-app

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

ShiftLog-app is a small web application for recording employee time punches (clock-ins and clock-outs) and querying work sessions. It's built with Angular and uses Firebase for authentication and hosting. The project includes generated Data Connect SDKs to interact with the backend datasource.

## What this app does

- Allow users to log in and record time punches (entry/exit).
- Store each punch with a timestamp and type (e.g. `in` / `out`).
- Query work sessions for a specific user, including start and end.
- Provide a minimal UI with a login screen and a punch screen.

## Quick start

1. Install dependencies:

```powershell
npm install
```

2. Setup the environment as explained below.

3. Build or deploy the app.

## Environment setup

This project uses Firebase. You must provide your own Firebase project credentials in `src/environments/environment.ts`.

Steps:

1. Create the file from the template:

```powershell
npm run env:init
```

2. Edit `src/environments/environment.ts` and replace all `YOUR_*` placeholders with your Firebase config values.

Notes:

- `src/environments/environment.ts` is ignored by Git, so your secrets won’t be committed.
- The dev server/start script will fail fast if the environment file is missing and will guide you to create it.

## Deploy to Firebase Hosting

1. Make sure `src/environments/environment.ts` is correct.
2. Build for production: `ng build --configuration production`.
3. Deploy:

```powershell
firebase deploy
```

## Local development server

To start a local development server, run:

```bash
ng serve
```

Then, navigate to the generated localhost URL.