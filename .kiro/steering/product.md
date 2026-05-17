# Product

This is a BDD test automation suite for [SauceDemo](https://www.saucedemo.com/), a demo e-commerce site used for QA practice.

The suite validates the login feature end-to-end, covering:
- Happy path logins for all supported user types (`standard_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`)
- Locked-out and invalid credential rejection
- Empty/missing field validation
- Error message UI behaviour (display, dismiss, styling)
- Page structure and element visibility
- Session and navigation behaviour (redirect, logout, back-button protection)
- Basic security checks (HTTPS, SQL injection, XSS)

The target application is `https://www.saucedemo.com/`. No backend or database access is required — all tests run through the browser UI.
