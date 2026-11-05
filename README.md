# Laboratory Manual #4 - Ionic Vue + Firebase CRUD (4 Tabs)

This is the Vue version of the Lab 4 activity. The original manual asks for an Ionic Tabs app with Firebase Firestore and CRUD operations. This version separates the four CRUD operations into four tabs.

## Tabs
1. **Create** - Add a new user to Firestore.
2. **Read** - Display users stored in Firestore.
3. **Update** - Select a user and edit the name/email.
4. **Delete** - Select a user and delete the record.

## Requirements
- Node.js and npm
- Ionic CLI
- Firebase project with Firestore Database enabled
- VS Code (recommended)

## Install
```bash
npm install -g @ionic/cli
npm install
```

## Firebase
Open `src/firebase.js` and replace the placeholder values with the Firebase Web App configuration from Firebase Console.

Create/enable **Firestore Database** in Firebase Console.

For a classroom demo only, you may temporarily use test mode rules. For a real application, use secure Firestore rules.

## Run
```bash
npm run dev
```

Or:
```bash
ionic serve
```

## Docker image deployment
After a successful push to `master`, GitHub Actions publishes the Docker image to GHCR and deploys it to the Docker Desktop host running the repository's self-hosted GitHub Actions runner:

```text
ghcr.io/kaylordfortu-afk/cicd_dockercabral:latest
```

The workflow also publishes a commit-specific `sha-<commit>` tag. The local deployment job pulls `latest` and recreates the Compose service on port `8080`.

To run it locally or on a Docker host manually:
```bash
docker pull ghcr.io/kaylordfortu-afk/cicd_dockercabral:latest
docker compose up -d
```

The local deployment requires the repository's self-hosted GitHub Actions runner to be online and Docker Desktop to be running. Start the runner from the `actions-runner` directory with `.\run.cmd` and leave it open. If the package is private, the workflow uses its `GITHUB_TOKEN` to authenticate; for manual pulls, authenticate to `ghcr.io` with a GitHub personal access token that has `read:packages` permission.

## CRUD demonstration
- **Create tab:** Add a user. (CREATE)
- **Read tab:** View saved users. (READ)
- **Update tab:** Select a user and modify the details. (UPDATE)
- **Delete tab:** Select a user and remove the record. (DELETE)

## Suggested demo sequence
1. Open **Create**.
2. Add two users.
3. Open **Read** and show both records.
4. Open **Update**, select one user, and change the information.
5. Open **Read** again and show the updated record.
6. Open **Delete**, select one user, and delete it.
7. Open **Read** and show that the record was removed.
