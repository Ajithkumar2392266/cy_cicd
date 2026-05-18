# Cypress GitHub Actions - Basic Setup

## 📋 Overview

This is a basic Cypress workflow with **4 essential steps**:

1. ✅ Checkout code
2. ✅ Setup Node.js
3. ✅ Install dependencies
4. ✅ Run Cypress tests
5. ✅ Upload reports & screenshots

---

## 🚀 Quick Start

### **Step 1: Workflow File Location**

Ensure the workflow file is at:
```
.github/workflows/cypress.yml
```

### **Step 2: Verify npm Scripts**

Your `package.json` should have:
```json
{
  "scripts": {
    "test:ci": "cypress run"
  }
}
```

### **Step 3: Push to Repository**

```bash
git add .github/workflows/cypress.yml
git commit -m "Add Cypress workflow"
git push origin main
```

### **Step 4: Watch Workflow Run**

1. Go to **Actions** tab in GitHub
2. Click on **Cypress E2E Tests**
3. Watch the workflow execute

---

## 📊 Workflow Steps

| Step | Command | Purpose |
|------|---------|---------|
| **Checkout** | `actions/checkout@v3` | Clone repository |
| **Setup Node** | `actions/setup-node@v3` | Install Node.js 18 |
| **Install** | `npm ci` | Install dependencies |
| **Run Tests** | `npm run test:ci` | Execute Cypress tests |
| **Upload Reports** | `actions/upload-artifact@v3` | Store test reports (30 days) |
| **Upload Screenshots** | `actions/upload-artifact@v3` | Store screenshots on failure (7 days) |

---

## 📁 File Structure

```
.github/
  workflows/
    cypress.yml              ← Workflow file

cypress/
  e2e/
    *.cy.js                  ← Test files
  reports/                   ← Generated reports
  screenshots/               ← Generated on failure
  support/
    e2e.js
    commands.js

package.json                 ← npm scripts
cypress.config.js            ← Cypress config
```

---

## ✅ Triggers

Workflow runs automatically on:

- ✅ **Push** to main, develop, or master branch
- ✅ **Pull requests** to main, develop, or master branch

---

## 📊 Accessing Reports

### **View in GitHub**

1. Go to **Actions** tab
2. Click on completed workflow run
3. Scroll to **Artifacts** section
4. Download `cypress-reports` or `cypress-screenshots`

### **Local Testing**

```bash
# Run tests locally
npm run test:ci

# View HTML report
open cypress/reports/report.html
```

---

## 🎯 Minimal Requirements

✅ Must have:
- `.github/workflows/cypress.yml`
- `package.json` with `test:ci` script
- `cypress.config.js`
- Test files in `cypress/e2e/`

❌ Don't need:
- GitHub Secrets
- Environment variables
- Matrix testing
- Scheduled runs

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Workflow not running | Check branch name (main/develop/master) |
| Tests failing | Run locally first: `npm run test:ci` |
| No reports | Check Mochawesome is installed |

---

## 📝 Example Workflow Run

```
✓ Checkout code
✓ Setup Node.js 18
✓ Install dependencies (npm ci)
✓ Run Cypress tests
  └─ 5 tests passed
✓ Upload reports
✓ Workflow completed
```

---

## 🔄 Next Steps

1. Commit workflow file
2. Push to main branch
3. Check **Actions** tab for execution
4. Download reports from artifacts

That's it! Simple and straightforward. 🎉

---

**Last Updated**: May 18, 2026
