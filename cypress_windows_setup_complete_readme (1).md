# Cypress Web Automation — Complete Windows Setup (VS Code / PowerShell)

> **Purpose:** Step‑by‑step, copy‑paste ready instructions to create, configure, run and CI‑integrate a Cypress automation project on **Windows** using **VS Code terminal (PowerShell)**. Includes POM, fixtures, custom commands, reporter, logs, screenshots, videos, cleanup, GitHub Actions and Jenkins examples.

---

## Table of Contents
1. Prerequisites
2. Create project & initialize
3. Install dependencies
4. Create folder & starter files (PowerShell copy‑paste)
5. Create `cypress.config.js`
6. Add cleanup script
7. Update `package.json` scripts
8. .gitignore
9. Run tests (open / headless / single spec / headed)
10. Generate merged report (optional)
11. CI: GitHub Actions (workflow)
12. CI: Jenkins (Jenkinsfile) — Windows & Linux examples
13. Cleanup strategies (options)
14. Troubleshooting checklist
15. Useful commands & tips
16. Recommended repo checklist

---

## 1) Prerequisites (Windows)

Open **VS Code**, then open its integrated terminal (Ctrl+`). Terminal defaults to **PowerShell**. Use PowerShell commands below.

If Node is not installed you can install via `winget` (Windows 10/11):

```powershell
winget install OpenJS.NodeJS.LTS
```

Verify installations:

```powershell
node -v
npm -v
git --version
```

If Git is missing:

```powershell
winget install Git.Git
```

---

## 2) Create project & initialize

Open a PowerShell terminal and run:

```powershell
# Create project folder and initialize npm
mkdir cypress-web-automation
cd cypress-web-automation
npm init -y
```

This creates `package.json`.

---

## 3) Install Cypress + Reporting + Helpers

Copy‑paste this single PowerShell command to install required packages:

```powershell
npm install --save-dev cypress \
  cypress-mochawesome-reporter \
  mochawesome mochawesome-merge marge \
  cypress-terminal-report \
  fs-extra \
  cypress-grep
```

**What these do:**
- `cypress` — test runner
- `cypress-mochawesome-reporter` — generates HTML & JSON per run
- `mochawesome`, `mochawesome-merge`, `marge` — optional tools to merge JSONs into a single HTML
- `cypress-terminal-report` — prints command-level logs in terminal
- `fs-extra` — file utilities used by cleanup hook / script
- `cypress-grep` — optional test tagging and filtering

---

## 4) Create folder & starter files (single PowerShell block)

Run this entire block from project root (copy‑paste into VS Code terminal). This creates folders and starter files: fixture, POM, commands, support file, and a sample spec.

```powershell
# create folders
New-Item -ItemType Directory -Path cypress\e2e,cypress\fixtures,cypress\pages,cypress\support,scripts -Force

# fixture
'{
  "validUser": { "username": "admin", "password": "password123" },
  "invalidUser": { "username": "wrong", "password": "wrongpass" }
}' | Out-File cypress\fixtures\users.json -Encoding utf8

# LoginPage POM
@'
class LoginPage {
  elements = {
    usernameInput: () => cy.get('#username'),
    passwordInput: () => cy.get('#password'),
    loginButton: () => cy.get('#loginBtn')
  };

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    this.elements.passwordInput().clear().type(password);
    this.elements.loginButton().click();
  }
}

module.exports = new LoginPage();
'@ | Out-File cypress\pages\LoginPage.js -Encoding utf8

# custom command
@'
Cypress.Commands.add("login", (username, password) => {
  cy.get("#username").clear().type(username);
  cy.get("#password").clear().type(password);
  cy.get("#loginBtn").click();
});
'@ | Out-File cypress\support\commands.js -Encoding utf8

# support entry (register commands and reporter)
@'
import "./commands";
import "cypress-mochawesome-reporter/register";
'@ | Out-File cypress\support\e2e.js -Encoding utf8

# sample spec (login.cy.js)
@'
const LoginPage = require("../pages/LoginPage");

describe("Login Tests", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("logs in with valid credentials (POM)", () => {
    LoginPage.login("admin", "password123");
    cy.contains("Dashboard").should("be.visible");
  });

  it("shows error for invalid credentials (custom command)", () => {
    cy.login("wrong", "wrongpass");
    cy.contains("Invalid username or password").should("be.visible");
  });

  it("logs in using fixture data", () => {
    cy.fixture("users").then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
    cy.contains("Dashboard").should("be.visible");
  });
});
'@ | Out-File cypress\e2e\login.cy.js -Encoding utf8
```

**Now you have:**
```
cypress/
  e2e/login.cy.js
  fixtures/users.json
  pages/LoginPage.js
  support/commands.js
  support/e2e.js
scripts/cleanReports.js (we'll create next)
package.json
```

---

## 5) Create `cypress.config.js`

Create `cypress.config.js` at project root (copy-paste content below into a new file). Update `baseUrl` to point to your application URL (for example `http://localhost:3000`).

```javascript
const { defineConfig } = require("cypress");
const fs = require("fs-extra");

module.exports = defineConfig({
  // reporter at top-level so reporter options apply
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: "http://localhost:3000", // << change to your app URL
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    video: true,

    screenshotsFolder: "cypress/reports/screenshots",
    videosFolder: "cypress/reports/videos",

    setupNodeEvents(on, config) {
      // 1) register mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      // 2) install terminal report printer
      require("cypress-terminal-report/src/installLogsPrinter")(on);

      // 3) Clean reports folder BEFORE each run (optional)
      on("before:run", async () => {
        try {
          fs.removeSync("cypress/reports");
          console.log("Cleaned cypress/reports");
        } catch (err) {
          console.warn("No reports folder to remove.");
        }
      });

      return config;
    }
  }
});
```

> Note: the `before:run` cleanup is optional — if you prefer to manage cleanup via npm scripts or CI, you can remove that block.

---

## 6) Add cross‑platform cleanup Node script

This script deletes `cypress/reports` in a portable way. Create `scripts/cleanReports.js` with the following content:

```javascript
const fs = require('fs-extra');
const path = 'cypress/reports';

if (fs.existsSync(path)) {
  fs.removeSync(path);
  console.log('🧹 Removed', path);
} else {
  console.log('No cypress/reports folder present.');
}
```

Save as `scripts\cleanReports.js`.

---

## 7) Update `package.json` scripts (PowerShell friendly)

Open `package.json` and replace/add the `scripts` section with the block below (or merge into existing):

```json
"scripts": {
  "clean:reports": "node ./scripts/cleanReports.js",
  "cypress:open": "npx cypress open",
  "cypress:run": "npm run clean:reports && npx cypress run",
  "cypress:run:spec": "npx cypress run --spec",
  "merge-reports": "npx mochawesome-merge cypress/reports/html/*.json > cypress/reports/report.json && npx marge cypress/reports/report.json -o cypress/reports/html",
  "report": "npm run merge-reports"
}
```

**Usage:**
- `npm run cypress:open` — interactive runner (do NOT expect JSON reports)
- `npm run cypress:run` — cleans reports then runs headless (generates JSON + HTML)
- `npm run report` — merges JSON files into a single `report.json` and generates combined HTML

---

## 8) .gitignore

Create `.gitignore` at repo root:

```
node_modules/
cypress/reports/
cypress/screenshots/
cypress/videos/
.env
```

> Keep reports out of Git; download CI artifacts instead if you need them.

---

## 9) Run tests (interactive & headless) — exact VS Code terminal commands

### 9.1 Interactive (open)

```powershell
npm run cypress:open
```

- Opens Cypress Test Runner UI. Use this for debugging and development. **Note:** `cypress open` does not generate JSON mochawesome files.

### 9.2 Headless (CI mode) — generates JSON & HTML via reporter

```powershell
npm run cypress:run
```

This will:
- Clean `cypress/reports` (runs `scripts\cleanReports.js`)
- Run all specs headless
- Generate screenshots on failures under `cypress/reports/screenshots`
- Generate videos under `cypress/reports/videos`
- `cypress-mochawesome-reporter` will create `.json` and `.html` files under `cypress/reports/html`

### 9.3 Run a single spec file

```powershell
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### 9.4 Run headed in Chrome (for debugging but still run tests via CLI)

```powershell
npx cypress run --headed --browser chrome
```

### 9.5 Override baseUrl on the fly

```powershell
npx cypress run --config baseUrl="http://localhost:8081"
```

### 9.6 Open generated HTML report (from PowerShell)

```powershell
ii .\cypress\reports\html\index.html
# or for merged report
ii .\cypress\reports\html\report.html
```

(`ii` is PowerShell's "invoke-item" — opens file with default app)

---

## 10) Merge JSON reports into one combined HTML (optional but recommended for many specs)

If you have multiple JSON report files (one per spec) and you want a single combined HTML:

```powershell
npm run report
```

What this does:
1. `mochawesome-merge cypress/reports/html/*.json > cypress/reports/report.json`
2. `marge cypress/reports/report.json -o cypress/reports/html`

After this you have `cypress/reports/html/report.html` (or `index.html`) containing combined results.

---

## 11) CI: GitHub Actions workflow (copy‑paste)

Create `.github\workflows\cypress.yml` with the following content. This runs on `ubuntu-latest` and uploads HTML, screenshots, videos as artifacts.

```yaml
name: Cypress Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress headless
        run: npm run cypress:run

      - name: Merge reports
        if: always()
        run: npm run report

      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: mochawesome-report
          path: cypress/reports/html

      - name: Upload screenshots
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: cypress/reports/screenshots

      - name: Upload videos
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: videos
          path: cypress/reports/videos
```

**Notes:**
- Put secrets (if any) into GitHub Repository Secrets and consume them by `env:` in the workflow.

---

## 12) CI: Jenkins pipeline examples

### Jenkinsfile for Windows agent (use `bat` commands)

Create `Jenkinsfile` at repo root:

```groovy
pipeline {
  agent { label 'windows' }
  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Install Dependencies') {
      steps { bat 'npm ci' }
    }

    stage('Clean & Run Cypress') {
      steps {
        bat 'node scripts\\cleanReports.js'
        bat 'npx cypress run'
      }
    }

    stage('Merge Reports') {
      steps {
        bat 'npx mochawesome-merge cypress/reports/html/*.json > cypress/reports/report.json'
        bat 'npx marge cypress/reports/report.json -o cypress/reports/html'
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/reports/screenshots/**/*', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/reports/videos/**/*', allowEmptyArchive: true
      }
    }
  }
  post { always { echo 'Pipeline finished' } }
}
```

### Jenkinsfile for Linux agent (use `sh` commands)

Replace `bat` with `sh` and adjust paths if needed:

```groovy
pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install') { steps { sh 'npm ci' } }
    stage('Clean & Run') { steps { sh 'node scripts/cleanReports.js'; sh 'npx cypress run' } }
    stage('Merge') { steps { sh 'npx mochawesome-merge cypress/reports/html/*.json > cypress/reports/report.json'; sh 'npx marge cypress/reports/report.json -o cypress/reports/html' } }
    stage('Archive') { steps { archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true } }
  }
}
```

---

## 13) Cleanup strategies (choose one)

- **Method A (Node script)** — `scripts/cleanReports.js` + call it in `npm run cypress:run`. Cross-platform and reliable.
- **Method B (Cypress hook)** — `on('before:run', ...)` in `cypress.config.js` to remove folder automatically.
- **Method C (Unique run folder)** — use `--config` overrides to write to a timestamped folder (no deletion required).
- **Method D (CI step)** — remove `cypress/reports` in CI job before running tests.

Recommended: **Method A** for local + CI safety, optionally combined with **Method D** in CI.

---

## 14) Troubleshooting checklist

- **No JSON files**: ensure `reporterOptions.json: true` and you ran `npx cypress run` (headless).
- **Only index.html present**: some reporter versions can generate HTML only. Ensure `json:true` in `reporterOptions`.
- **Old files remain**: run `npm run clean:reports` or enable `before:run` cleanup.
- **No videos**: confirm `video: true` in config and headless run.
- **No screenshots**: Cypress captures screenshots on failure automatically; use `cy.screenshot()` to capture manually.
- **Interactive vs headless differences**: `cypress open` is interactive and behaves slightly different; for CI reproducibility always use `cypress run`.

---

## 15) Useful commands cheat sheet (VS Code terminal / PowerShell)

```powershell
# open VS Code terminal and run tests
npm run cypress:open

# run all tests headless (cleans reports first)
npm run cypress:run

# run a single spec
npx cypress run --spec "cypress/e2e/login.cy.js"

# run headed in Chrome (for debugging)
npx cypress run --headed --browser chrome

# open generated report
ii .\cypress\reports\html\index.html

# merge JSONs into one HTML
npm run report

# clean reports manually
npm run clean:reports
```

---

## 16) Recommended repo checklist (what to commit)

- `cypress/` source files (specs, pages, support, fixtures) **(do commit)**
- `cypress.config.js` **(do commit)**
- `package.json` and `package-lock.json` **(do commit)**
- `scripts/cleanReports.js` **(do commit)**
- `.github/workflows/cypress.yml` **(do commit)**
- `Jenkinsfile` **(do commit)**

**Do NOT commit:** `node_modules/`, `cypress/reports/`, `cypress/screenshots/`, `cypress/videos/`, `.env`

---

## 17) Optional additions (quick notes)

- **ESLint + Prettier + Husky** — linting & pre-commit hooks
- **cypress-image-snapshot / Percy** — visual regression
- **cypress-axe** — accessibility checks
- **Cypress Dashboard** — parallelization & flake management (requires Cypress account/key)
- **Slack / Teams notifications** — post CI artifacts/links on failure

---

## 18) Final tips
- Always run `npm run cypress:run` in CI (not `open`).
- Keep `reportDir` under `cypress/reports` so CI jobs can easily collect artifacts.
- Use fixtures for test data and avoid committing sensitive credentials — use environment variables.

---

If you want, I can:
- generate a ready-to-commit `README.md` file inside your repo with the above contents,
- create the actual files in your repository structure (I can provide a zip of all files as a code bundle), or
- add ESLint/Husky + example GitHub Secrets usage in the workflow.

Tell me which of these you'd like next.

