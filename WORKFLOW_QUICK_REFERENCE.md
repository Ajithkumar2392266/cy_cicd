# Cypress Workflow Quick Reference

## 📁 File Locations

```
.github/
  workflows/
    cypress.yml          ← Workflow file (created)

cypress/
  e2e/
    saucedemo.cy.js
    withoutpom.cy.js
  pages/
    LoginPage.js
    InventoryPage.js
    etc...
  fixtures/
    users.json
  reports/              ← Generated reports
  screenshots/          ← Generated on failure
  videos/               ← Generated on failure
  support/
    e2e.js
    commands.js

.gitignore             ← Updated
cypress.config.js      ← Updated with env variables
package.json           ← Updated with test:ci script
cypress.env.json       ← Local only (in .gitignore)
```

## 🔑 GitHub Secrets Setup

Go to: **Settings → Secrets and variables → Actions**

```
Name: CYPRESS_USER
Value: standard_user

Name: CYPRESS_PWD
Value: secret_sauce

Name: CYPRESS_API_URL
Value: https://api.saucedemo.com
```

## 📋 Workflow Triggers

| Trigger | Details |
|---------|---------|
| **Push** | Any push to main, develop, or master |
| **Pull Request** | Any PR to main, develop, or master |
| **Schedule** | Daily at 2 AM UTC |

## 📊 Generated Artifacts

| Artifact | Retention | Condition |
|----------|-----------|-----------|
| Reports | 30 days | Always |
| Screenshots | 7 days | On failure |
| Videos | 7 days | On failure |

## 🚀 Commands to Run Locally

```bash
# Open Cypress UI
npm run cy:open

# Run tests headless (generates reports)
npm run cy:run

# Run tests with report
npm run test:report

# Run tests (same as test:ci)
npm run test:ci

# Clean old reports
npm run report:clean
```

## 🔄 Environment Variables

### Local Development
```bash
# Windows PowerShell
$env:CYPRESS_USER='standard_user'
$env:CYPRESS_PWD='secret_sauce'
npm run cy:run

# Linux/Mac
CYPRESS_USER=standard_user CYPRESS_PWD=secret_sauce npm run cy:run
```

### CI/CD
Uses GitHub Secrets automatically

## 📊 Matrix Testing

Tests run on:
- ✅ Node.js 18.x
- ✅ Node.js 20.x

Both versions run simultaneously.

## 🎯 Test Report Access

1. Go to **Actions** tab
2. Click latest **Cypress E2E Tests** run
3. Scroll to **Artifacts** section
4. Download `cypress-reports-18.x` (or 20.x)
5. Extract and open `cypress/reports/report.html`

## ✅ Checklist Before First Run

- [ ] `.github/workflows/cypress.yml` exists
- [ ] GitHub Secrets added (CYPRESS_USER, CYPRESS_PWD, CYPRESS_API_URL)
- [ ] `package.json` has `test:ci` script
- [ ] `cypress.config.js` has env variables
- [ ] `cypress.env.json` is in `.gitignore`
- [ ] All dependencies installed (`npm install`)
- [ ] Tests run locally successfully (`npm run cy:run`)

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Secrets not working | Verify names match and are set for correct repo |
| Tests not running | Check `npm run test:ci` script exists |
| No reports generated | Verify Mochawesome is installed |
| PR comments not posting | Check workflow permissions |

## 📚 Useful Links

- [View Workflow Run](../../actions)
- [Manage Secrets](../../settings/secrets/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**Last Updated**: May 18, 2026
