# ShiftLog-app

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

then, navigate to the generated localhost URL.

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

## Development server

To start a local development server, run:

```powershell
npm start
```

then navigate to the printed localhost URL.

## Build and deploy

```powershell
ng build --configuration production
firebase deploy
```

Then navigate to the generated hosting URL.
