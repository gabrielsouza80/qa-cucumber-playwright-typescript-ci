# qa-cucumber-playwright-typescript-ci

BDD QA automation portfolio project using Cucumber, Playwright, TypeScript, GitHub Actions, and Jenkins.

The project automates the login flow for [SauceDemo](https://www.saucedemo.com/) and is designed for a Junior QA Automation Tester portfolio. It keeps the structure simple while demonstrating Gherkin scenarios, step definitions, Page Object Model, reports, and CI/CD examples.

## Technologies

- TypeScript
- Cucumber.js
- Gherkin
- Playwright
- Page Object Model
- GitHub Actions
- Jenkins Pipeline

## Folder Structure

```text
features/
  login.feature

src/
  pages/
    LoginPage.ts
  steps/
    login.steps.ts
  support/
    world.ts
    hooks.ts

reports/
.github/
  workflows/
    tests.yml

cucumber.js
Jenkinsfile
package.json
tsconfig.json
README.md
.gitignore
```

## Test Scenarios

- Login with valid credentials
- Login with invalid credentials

Valid login verifies that the user reaches the products page. Invalid login verifies that an error message is displayed.

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the Cucumber tests:

```bash
npm test
```

Run the tests and generate the HTML report:

```bash
npm run test:report
```

## Reports

The HTML report is generated at:

```text
reports/cucumber-report.html
```

Open this file in a browser after running `npm run test:report`.

## CI/CD

### GitHub Actions

The workflow in `.github/workflows/tests.yml` runs on pushes and pull requests to `main`. It installs dependencies, installs Playwright browsers, runs the Cucumber tests, and uploads the `reports` folder as an artifact.

### Jenkins

The `Jenkinsfile` provides an example Jenkins pipeline. It checks out the repository, installs dependencies, installs Playwright browsers, runs the test suite, and archives the `reports` folder.

## Project Purpose

This repository demonstrates a clean, maintainable BDD automation project for a Junior QA Automation Tester profile. The first implementation focuses only on the SauceDemo login flow so the project stays readable and easy to extend.
