class LoginPage {
  constructor() {
    this.usernameField = '[data-test="username"]';
    this.passwordField = '[data-test="password"]';
    this.loginButton = '[data-test="login-button"]';
    this.errorMessage = '[data-test="error"]';
  }

  visit() {
    cy.visit('/');
  }

  enterUsername(username) {
    cy.get(this.usernameField).type(username);
    return this;
  }

  enterPassword(password) {
    cy.get(this.passwordField).type(password);
    return this;
  }

  clickLogin() {
    cy.get(this.loginButton).click();
    return this;
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  verifyErrorMessage(expectedText) {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', expectedText);
    return this;
  }
}

export default new LoginPage();
