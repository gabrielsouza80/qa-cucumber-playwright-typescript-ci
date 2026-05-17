# Tech Stack

## Core Libraries
- **Test runner**: `@cucumber/cucumber` v12 — BDD scenarios written in Gherkin
- **Browser automation**: `playwright` v1.60 — direct Playwright API (not `@playwright/test` runner)
- **Language**: TypeScript v6, compiled on-the-fly via `ts-node`
- **Node module system**: `Node16` (ESM-compatible, `module: Node16` in tsconfig)

## TypeScript Config
- Target: `ES2020`
- Strict mode enabled
- Only `src/**/*.ts` is compiled — feature files and config files are plain JS/Gherkin

## Cucumber Config (`cucumber.js`)
Two profiles are defined:
- `default` — runs tests with `progress` formatter (console only)
- `report` — same as default but also generates `reports/cucumber-report.html`

Support files and step definitions are loaded via glob:
- `src/support/**/*.ts`
- `src/steps/**/*.ts`

Feature files are loaded from `features/**/*.feature`.

## Runtime Config (`src/support/config.ts`)
| Setting | Value |
|---|---|
| `baseUrl` | `https://www.saucedemo.com/` |
| `headless` | `true` unless `HEADLESS=false` env var is set |
| `timeout` | 30 000 ms (page default + navigation) |
| `viewport` | 1280 × 720 |

## CI
- **GitHub Actions**: `.github/workflows/tests.yml`
- **Jenkins**: `Jenkinsfile` at repo root

## Common Commands

```bash
# Run all tests (progress output)
npm test

# Run all tests and generate HTML report → reports/cucumber-report.html
npm run test:report

# Run headed (useful for local debugging)
HEADLESS=false npm test
```
