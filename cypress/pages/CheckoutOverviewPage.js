class CheckoutOverviewPage {
  constructor() {
    this.inventoryItems = '[data-test="inventory-item"]';
    this.inventoryItemPrice = '[data-test="inventory-item-price"]';
    this.subtotalLabel = '[data-test="subtotal-label"]';
    this.finishButton = '[data-test="finish"]';
  }

  verifyOverviewPage() {
    cy.url().should('include', '/checkout-step-two.html');
    cy.get(this.inventoryItems).should('have.length', 2);
    return this;
  }

  verifySubtotal() {
    cy.get(this.inventoryItemPrice).then(($prices) => {
      const sum = [...$prices].reduce(
        (acc, el) => acc + parseFloat(el.innerText.replace('$', '')),
        0
      );

      cy.get(this.subtotalLabel)
        .invoke('text')
        .then((subtotalText) => {
          const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
          expect(subtotal).to.equal(sum);
        });
    });
    return this;
  }

  clickFinish() {
    cy.get(this.finishButton).click();
    return this;
  }
}

export default new CheckoutOverviewPage();
