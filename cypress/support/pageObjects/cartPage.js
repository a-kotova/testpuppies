export class CartPage {
  get changeYourMindButton() {
    return cy.get('input[value="Change your mind"]');
  }

  get adoptAnotherPuppyButton() {
    return cy.get('input[value="Adopt Another Puppy"]');
  }

  get completeAdoptionButton() {
    return cy.get('input[value="Complete the Adoption"]');
  }

  get totalPrice() {
    return cy.get('.total_cell h2');
  }

  addAdditionalService(targetPuppy, selectedService) {
    cy.contains('h2', targetPuppy.name)
      .parent()
      .parent()
      .nextUntil('tr:has("img")')
      .find(`input[name='${selectedService.name}']`)
      .check();
  }

  verifyTotalPriceIsCorrect(expectedPrice) {
    this.totalPrice.invoke('text').then((text) => {
      // getPriceValue is a custom method that uses regexp to get numeric price value
      cy.getPriceValue(text).should('equal', expectedPrice);
    });
  }
}
