class CartPage {
  constructor() {
    this.inventoryItems = '[data-test="inventory-item"]';
    this.inventoryItemName = '[data-test="inventory-item-name"]';
    this.checkoutButton = '[data-test="checkout"]';
  }

  verifyCartItems(expectedItemCount) {
    cy.url().should('include', '/cart.html');
    cy.get(this.inventoryItems).should('have.length', expectedItemCount);
    return this;
  }

  verifyCartItemNames(expectedNames) {
    cy.get(this.inventoryItemName).then(($items) => {
      const names = [...$items].map((el) => el.innerText);
      expectedNames.forEach((name) => {
        expect(names).to.include(name);
      });
    });
    return this;
  }

  clickCheckout() {
    cy.get(this.checkoutButton).click();
    return this;
  }
}

export default new CartPage();
