class InventoryPage {
  constructor() {
    this.pageTitle = '[data-test="title"]';
    this.inventoryItems = '[data-test="inventory-item"]';
    this.inventoryItemName = '[data-test="inventory-item-name"]';
    this.inventoryItemPrice = '[data-test="inventory-item-price"]';
    this.addToCartBackpack = '[data-test="add-to-cart-sauce-labs-backpack"]';
    this.addToCartBikeLight = '[data-test="add-to-cart-sauce-labs-bike-light"]';
    this.shoppingCartBadge = '[data-test="shopping-cart-badge"]';
    this.shoppingCartLink = '[data-test="shopping-cart-link"]';
    this.productSortContainer = '[data-test="product-sort-container"]';
  }

  verifyProductsPage() {
    cy.url().should('include', '/inventory.html');
    cy.get(this.pageTitle).should('have.text', 'Products');
    cy.get(this.inventoryItems).should('have.length', 6);
    return this;
  }

  addBackpackToCart() {
    cy.get(this.addToCartBackpack).click();
    return this;
  }

  addBikeLightToCart() {
    cy.get(this.addToCartBikeLight).click();
    return this;
  }

  verifyCartBadge(count) {
    cy.get(this.shoppingCartBadge).should('have.text', count.toString());
    return this;
  }

  openCart() {
    cy.get(this.shoppingCartLink).click();
    return this;
  }

  sortByPriceHighToLow() {
    cy.get(this.productSortContainer).select('hilo');
    return this;
  }

  verifyPricesSortedHighToLow() {
    cy.get(this.inventoryItemPrice).then(($prices) => {
      const prices = [...$prices].map((el) =>
        parseFloat(el.innerText.replace('$', ''))
      );
      const sortedDesc = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedDesc);
    });
    return this;
  }
}

export default new InventoryPage();
