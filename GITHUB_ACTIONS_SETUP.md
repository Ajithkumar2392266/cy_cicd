# Cypress CI/CD Workflow Documentation

## 📋 Overview

This GitHub Actions workflow runs Cypress E2E tests automatically on:
- ✅ Push to main, develop, or master branches
- ✅ Pull requests to main, develop, or master branches
- ✅ Daily schedule (2 AM UTC)

---

## 🔧 Setup Instructions

### 1. **Add GitHub Secrets**

In your GitHub repository:
1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add the following secrets:

```
CYPRESS_USER = standard_user
CYPRESS_PWD = secret_sauce
CYPRESS_API_URL = https://api.saucedemo.com
```

### 2. **Verify Workflow File Location**

Ensure the workflow file is at:
```
.github/workflows/cypress.yml
```

### 3. **Verify npm Scripts**

Your `package.json` should have:
```json
{
  "scripts": {
    "test:ci": "cypress run",
    "cy:run": "cypress run",
    "cy:open": "cypress open"
  }
}
```

### 4. **Verify cypress.config.js**

Your config should have environment variables:
```javascript
env: {
  USER: process.env.CYPRESS_USER || 'standard_user',
  PWD: process.env.CYPRESS_PWD || 'secret_sauce',
  apiUrl: process.env.CYPRESS_API_URL || 'https://api.saucedemo.com',
}
```

---

## 📊 Workflow Steps Explained

### Step 1: **Checkout Code**
- Clones your repository code
- Uses GitHub's default checkout action

### Step 2: **Setup Node.js**
- Installs Node.js (tests on versions 18.x and 20.x)
- Uses npm cache for faster installation

### Step 3: **Install Dependencies**
- Runs `npm ci` (cleaner install than npm install)
- Installs all project dependencies

### Step 4: **Run Linting** (Optional)
- Runs `npm run lint` if available
- Continues even if linting fails

### Step 5: **Run Cypress Tests**
- Executes `npm run test:ci`
- Uses environment variables from GitHub Secrets
- Generates HTML and JSON reports

### Step 6: **Generate Report**
- Lists report files for verification
- Runs only on test completion

### Step 7: **Upload Test Reports**
- Uploads Mochawesome HTML reports
- Stores for 30 days
- Always runs (success or failure)

### Step 8: **Upload Screenshots**
- Uploads screenshots on test failure
- Stores for 7 days
- Helps debug failures

### Step 9: **Upload Videos**
- Uploads test videos on failure
- Stores for 7 days
- Useful for understanding test failures

### Step 10: **Comment PR with Results**
- Posts test results in PR comments
- Only on pull requests
- Continues even if comment fails

### Step 11: **Notify on Failure**
- Notifies when tests fail
- Helps catch issues quickly

---

## 📈 Workflow Features

### Matrix Testing
Tests run on multiple Node.js versions:
- Node 18.x
- Node 20.x

### Conditional Steps
- Screenshots only on failure
- Videos only on failure
- PR comments only on PRs

### Artifacts
- **Reports**: Stored for 30 days
- **Screenshots**: Stored for 7 days
- **Videos**: Stored for 7 days

### Scheduled Runs
- Runs daily at 2 AM UTC
- Helps catch regressions early

---

## 🚀 How to Use

### View Workflow Status
1. Go to **Actions** tab in your repository
2. Click on **Cypress E2E Tests**
3. View latest run status

### Download Reports
1. Click on a completed workflow run
2. Scroll to **Artifacts** section
3. Download `cypress-reports-*.zip`

### View Test Results
1. Download the reports artifact
2. Extract the ZIP file
3. Open `cypress/reports/report.html` in browser

### Debug Failures
1. Check **Screenshots** artifact if available
2. Check **Videos** artifact if available
3. View workflow logs for detailed error messages

---

## 🔐 Security Best Practices

✅ **Do's:**
- Use GitHub Secrets for sensitive data
- Never commit credentials to repository
- Rotate secrets regularly
- Use environment variables in CI

❌ **Don'ts:**
- Don't hardcode usernames/passwords
- Don't commit `.env` or `cypress.env.json`
- Don't expose API keys in logs

---

## 📝 Example Workflow Runs

### ✅ Success
```
✓ Checkout code
✓ Setup Node.js 18.x
✓ Install dependencies
✓ Run Cypress tests (5 passed)
✓ Upload reports
✓ Workflow completed successfully
```

### ❌ Failure
```
✓ Checkout code
✓ Setup Node.js 18.x
✓ Install dependencies
✗ Run Cypress tests (2 failed)
✓ Upload screenshots
✓ Upload videos
✗ Workflow failed
```

---

## 🆘 Troubleshooting

### Tests not running
- Check if `npm run test:ci` script exists
- Verify Node.js version compatibility
- Check for missing dependencies

### Reports not generated
- Verify Mochawesome is installed
- Check `cypress.config.js` reporter configuration
- Ensure tests are actually running

### Secrets not working
- Verify secret names match environment variables
- Check `CYPRESS_` prefix in secret names
- Ensure secrets are set for the correct repository

### PR comments not posting
- Check if workflow has permission to comment
- Verify pull request event is triggered
- Check for comment action errors in logs

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cypress Documentation](https://docs.cypress.io)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)

---

## 🎯 Next Steps

1. ✅ Commit workflow file to `.github/workflows/cypress.yml`
2. ✅ Add GitHub Secrets
3. ✅ Push to main/develop branch
4. ✅ Watch workflow run automatically
5. ✅ Review test reports and results

Happy testing! 🚀
