class CheckoutPage {
  constructor() {
    this.firstNameField = '[data-test="firstName"]';
    this.lastNameField = '[data-test="lastName"]';
    this.postalCodeField = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
  }

  enterCheckoutInfo(firstName, lastName, postalCode) {
    cy.get(this.firstNameField).type(firstName);
    cy.get(this.lastNameField).type(lastName);
    cy.get(this.postalCodeField).type(postalCode);
    return this;
  }

  clickContinue() {
    cy.get(this.continueButton).click();
    return this;
  }

  fillAndContinue(firstName, lastName, postalCode) {
    this.enterCheckoutInfo(firstName, lastName, postalCode);
    this.clickContinue();
    return this;
  }
}

export default new CheckoutPage();
