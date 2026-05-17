# Project Structure

```
├── features/                  # Gherkin feature files
│   └── login.feature          # All login scenarios
│
├── src/
│   ├── pages/                 # Page Object classes
│   │   └── LoginPage.ts       # Locators + actions + assertions for the login page
│   ├── steps/                 # Cucumber step definitions (one file per feature)
│   │   └── login.steps.ts
│   └── support/               # Cucumber infrastructure
│       ├── config.ts          # Central runtime config (baseUrl, headless, timeout, viewport)
│       ├── hooks.ts           # Before/After hooks — browser lifecycle per scenario
│       └── world.ts           # CustomWorld — shared state (browser, context, page, page objects)
│
├── reports/                   # Generated HTML report (git-ignored, created by test:report)
│   └── cucumber-report.html
│
├── .github/workflows/         # GitHub Actions CI pipeline
├── Jenkinsfile                # Jenkins CI pipeline
├── cucumber.js                # Cucumber profile config (default + report)
├── tsconfig.json              # TypeScript compiler config
└── package.json
```

## Architecture Patterns

**Page Object Model (POM)**
Each page has a dedicated class in `src/pages/`. The class owns:
- All locators (declared as `readonly` properties in the constructor using `data-test` attributes where available)
- Action methods (e.g. `login()`, `logout()`, `closeErrorMessage()`)
- Assertion methods prefixed with `expect` (e.g. `expectErrorMessageVisible()`, `expectInputHasErrorStyle()`)

Assertions live on the page object, not in step definitions. Step definitions stay thin — they only delegate to the page object.

**CustomWorld**
`CustomWorld` extends Cucumber's `World` and holds all shared state for a scenario: `browser`, `context`, `page`, and page object instances. Page objects are instantiated in the `Before` hook and accessed via `this` (typed as `CustomWorld`) in step definitions.

**Step definitions**
- Use a `getXxxPage(world)` guard function to safely unwrap the page object and throw a clear error if it wasn't initialized.
- Steps are grouped by Given / When / Then with section comments.
- One step file per feature file.

## Conventions

- Locators use `data-test` attributes as the first choice; fall back to stable CSS selectors (IDs, semantic class names) only when `data-test` is unavailable.
- No hardcoded URLs or timeouts in page objects or steps — always read from `src/support/config.ts`.
- New features follow the same layout: one `.feature` file → one steps file → one page object class.
- The `HEADLESS` environment variable controls headed/headless mode; no code changes needed for local debugging.
