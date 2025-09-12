# 📘 Cypress Training - Part 1

**Topic:** Introduction & Setup

---

## 🎯 Learning Objectives

By the end of this session, learners will be able to:

* Understand what Cypress is and why it is used in web automation.
* Identify Cypress features and compare it with Selenium.
* Install and configure Cypress on their machine.
* Run their first Cypress test using the Test Runner.

---

## 📝 Agenda

1. Introduction to Cypress
2. Benefits & Features of Cypress
3. Cypress vs Selenium
4. System Requirements & Installation
5. Cypress Test Runner Overview
6. Hands-on Demo: Running First Test
7. Assignment

---

## 1. 🔹 Introduction to Cypress

* Cypress is a **next-generation front-end testing tool** for modern web applications.
* Built on **Node.js** and distributed as an **npm package**.
* Supports:

  * Unit Testing
  * Integration Testing
  * End-to-End (E2E) Testing

---

## 2. 🔹 Benefits & Features of Cypress

* **Automatic Waiting** → No need for explicit waits/sleeps.
* **Architecture** → Runs inside the browser, unlike Selenium which runs outside via WebDriver.
* **Snapshots** → Takes screenshots of test execution steps.
* **Debugging** → Directly debug from browser DevTools.
* **Screenshots & Videos** → Captures on failure or manually.
* **Cross Browser Testing** → Chrome, Edge, Electron, Firefox.

---

## 3. 🔹 Cypress vs Selenium

| Feature            | Selenium                      | Cypress                   |
| ------------------ | ----------------------------- | ------------------------- |
| Language Support   | Java, Python, C#, Ruby, etc.  | JavaScript (only)         |
| Execution Model    | Outside browser via WebDriver | Inside browser event loop |
| Setup Complexity   | High (drivers, libs)          | Low (npm install)         |
| Debugging          | Limited                       | Easy with DevTools        |
| Automatic Waits    | No (manual waits needed)      | Yes (built-in waiting)    |
| Screenshots/Videos | Requires setup                | Built-in                  |

---

## 4. 🔹 System Requirements & Installation

### ✅ Prerequisites

* **Node.js** (LTS recommended) → [Download Node.js](https://nodejs.org/)
* **VS Code** (IDE) → [Download VS Code](https://code.visualstudio.com/)

### ✅ Steps to Install Cypress

1. Install Node.js

   ```bash
   node -v
   npm -v
   ```

   (Verify Node.js and npm are installed)

2. Create a project folder and initialize npm

   ```bash
   mkdir cypress-training
   cd cypress-training
   npm init -y
   ```

3. Install Cypress as a dev dependency

   ```bash
   npm install cypress --save-dev
   ```

4. Open Cypress Test Runner

   ```bash
   npx cypress open
   ```

---

## 5. 🔹 Cypress Test Runner Overview

* Opens an **interactive GUI** for running tests.
* Sample project with test examples is provided.
* Features of Test Runner:

  * Real-time test execution.
  * Step-by-step command log.
  * Snapshots before/after execution.
  * Easy debugging from browser.

---

## 6. 🖥️ Hands-on Demo: Running First Test

### ✅ Steps

1. Run the following command:

   ```bash
   npx cypress open
   ```
2. Cypress Test Runner launches → Select **E2E Testing**.
3. Choose a browser (e.g., Chrome).
4. Run the sample test `spec.cy.js`.

### ✅ Example Test (visit page & check title)

```javascript
describe('My First Cypress Test', () => {
  it('Visits the Example Page and checks title', () => {
    cy.visit('https://example.cypress.io')
    cy.title().should('include', 'Cypress')
  })
})
```

### ✅ Execution Result

* Cypress opens browser.
* Runs test in real time.
* Displays step logs & snapshots in Test Runner.

---

## 7. 📚 Assignment

👉 Perform the following tasks on your machine:

1. Install Cypress in a new project folder.
2. Open Cypress Test Runner (`npx cypress open`).
3. Write and execute a test that:

   * Visits [https://example.cypress.io](https://example.cypress.io).
   * Verifies the page title contains `"Cypress"`.
   * Takes a screenshot of the executed test.

✅ **Deliverable:** Push your Cypress project to GitHub with the new test file in the `cypress/e2e` folder.


# 📘 Cypress Training – Part 2

**Topic:** Cypress Architecture & Folder Structure

---

## 🎯 Learning Objectives

By the end of this session, learners will be able to:

* Understand the Cypress architecture and how it differs from Selenium.
* Learn the internal components of Cypress (Node.js server, Test Runner, Browser, Proxy, File System, Plugins).
* Understand the Cypress folder structure and configuration files.
* Customize configuration for test execution.

---

## 📝 Agenda

1. Cypress Architecture
2. Cypress Components Explained
3. Cypress vs Selenium (Architecture View)
4. Cypress Folder Structure
5. Configuration Files (`cypress.config.js`)
6. Hands-on Demo: Customizing Configuration
7. Assignment

---

## 1. 🔹 Cypress Architecture

Unlike Selenium, Cypress **runs directly in the browser** and shares the same event loop as the application under test.

### Key Components:

1. **Node.js Server Process**

   * Acts as the backbone of Cypress.
   * Handles OS-level tasks: reading/writing files, network operations, plugins.

2. **Test Runner (GUI)**

   * Visual interface where tests execute.
   * Provides real-time results, command log, snapshots, debugging tools.

3. **Browser**

   * Tests run **inside the browser** (not outside like Selenium WebDriver).
   * Direct execution gives faster and more reliable results.

4. **Network Proxy**

   * Intercepts and modifies network requests/responses.
   * Allows stubbing, mocking, simulating network failures.

5. **File System Access**

   * Directly reads/writes files.
   * Used for fixtures (test data), screenshots, videos, reports.

6. **API & Plugins**

   * Cypress provides a rich API (`cy.*` commands).
   * Plugins extend Cypress (e.g., XPath support, reporting).

---

## 2. 🔹 Cypress Architecture Diagram

```
 ┌─────────────────────────────┐
 │        Node.js Server       │
 │ (OS tasks, File, Network)   │
 └───────────────┬─────────────┘
                 │
                 ▼
 ┌─────────────────────────────┐
 │       Cypress Test Runner   │
 │ (Executes Tests, Debugging) │
 └───────────────┬─────────────┘
                 │
                 ▼
 ┌─────────────────────────────┐
 │         Browser (AUT)       │
 │  Cypress runs inside browser │
 └───────────────┬─────────────┘
                 │
                 ▼
 ┌─────────────────────────────┐
 │        Network Proxy        │
 │   Intercept & Stub Calls    │
 └─────────────────────────────┘
```

---

## 3. 🔹 Cypress vs Selenium (Architecture View)

| Aspect             | Selenium                          | Cypress                                    |
| ------------------ | --------------------------------- | ------------------------------------------ |
| Execution Model    | WebDriver → Commands → Browser    | Directly inside the browser event loop     |
| Speed              | Slower (extra layer of WebDriver) | Faster (no external driver needed)         |
| Network Stubbing   | Requires third-party libraries    | Built-in network stubbing/proxy            |
| File System Access | Limited (via language bindings)   | Direct file system access (fixtures, logs) |

---

## 4. 🔹 Cypress Folder Structure

When Cypress is installed, project structure looks like:

```
cypress/
 ├── fixtures/        # Test data (JSON, key-value pairs)
 ├── integration/     # Test cases (spec files)
 ├── plugins/         # Event handlers & plugins
 ├── support/         # Custom commands & reusable functions
 ├── videos/          # Auto-recorded test run videos
 ├── screenshots/     # Test failure/screenshot captures
node_modules/         # Project dependencies
cypress.config.js     # Cypress configuration
package.json          # npm dependencies & scripts
```

---

## 5. 🔹 Configuration Files

### `cypress.config.js` (Cypress v10+)

* Central place to manage Cypress test configuration.
* Example configuration:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.cypress.io",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    retries: 1
  }
});
```

### Common Config Options:

* **baseUrl** → Default URL for `cy.visit()`.
* **viewportWidth/Height** → Browser size during test.
* **video/screenshots** → Enable or disable recordings.
* **retries** → Retry failed tests.

---

## 6. 🖥️ Hands-on Demo: Customizing Configuration

### ✅ Step 1: Open Cypress Config File

```bash
code cypress.config.js
```

### ✅ Step 2: Add Custom Config

```javascript
e2e: {
  baseUrl: "https://example.cypress.io",
  viewportWidth: 1024,
  viewportHeight: 768,
  video: false
}
```

### ✅ Step 3: Run Test with Config

```javascript
describe('Config Demo', () => {
  it('should use baseUrl from config', () => {
    cy.visit('/') // no need to write full URL
    cy.title().should('include', 'Cypress')
  })
})
```

👉 Notice that `cy.visit('/')` works because `baseUrl` is set.

---

## 7. 📚 Assignment

1. Open your Cypress project.
2. Update `cypress.config.js` with:

   * `baseUrl: "https://example.cypress.io"`
   * `viewportWidth: 1200`, `viewportHeight: 800`
   * `video: false`
3. Write a test that:

   * Visits the base URL using `cy.visit('/')`.
   * Verifies that the page title includes `"Cypress"`.
4. Add a fixture file `user.json` in `fixtures/` with sample login data.

   ```json
   {
     "username": "testUser",
     "password": "testPass"
   }
   ```
5. Print the fixture data inside your test using:

   ```javascript
   cy.fixture('user').then((user) => {
     cy.log(user.username)
   })
   ```

✅ **Deliverable:** Push updated project with modified config & new fixture to GitHub.

---


