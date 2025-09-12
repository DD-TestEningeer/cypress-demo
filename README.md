# 📘 Cypress Training – Session 1

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

---

