class CheckoutCompletePage {
  constructor() {
    this.completeHeader = '[data-test="complete-header"]';
    this.completeText = '[data-test="complete-text"]';
    this.backToProductsButton = '[data-test="back-to-products"]';
    this.shoppingCartBadge = '[data-test="shopping-cart-badge"]';
  }

  verifyOrderSuccess() {
    cy.url().should('include', '/checkout-complete.html');
    cy.get(this.completeHeader).should('have.text', 'Thank you for your order!');
    cy.get(this.completeText).should('be.visible');
    return this;
  }

  clickBackHome() {
    cy.get(this.backToProductsButton).click();
    return this;
  }

  verifyCartIsEmpty() {
    cy.url().should('include', '/inventory.html');
    cy.get(this.shoppingCartBadge).should('not.exist');
    return this;
  }
}

export default new CheckoutCompletePage();
