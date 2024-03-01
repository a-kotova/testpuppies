export class PuppyDetailsPage {
  get puppyImage() {
    return cy.get('#content img');
  }

  get puppyName() {
    return cy.get('#content h2');
  }

  get puppyBreed() {
    return cy.get('#content h3');
  }

  get puppyDescription() {
    return cy.get('#content p');
  }

  get adoptionFeeByline() {
    return cy.get('span.fees');
  }

  get adoptMeButton() {
    return cy.get('#content .rounded_button');
  }

  get returnToListOfPuppiesButton() {
    return cy.get('#content a');
  }

  navigateToPuppyDetailsPage(targetPuppy) {
    cy.visit(`/puppies/${targetPuppy.id}`);
  }

  verifyPuppyDetails(targetPuppy) {
    this.puppyImage.should('be.visible');
    this.puppyName
      .should('be.visible')
      .should('contain', targetPuppy.name);
    this.puppyBreed
      .should('be.visible')
      .should('contain', targetPuppy.breed);
    this.puppyDescription.should('be.visible');
    this.puppyDescription.invoke('text').then((text) => {
      cy.formatString(text).should('contain', targetPuppy.description);
    });
    this.adoptionFeeByline.should('be.visible');
  }

  verifyAdoptionFeeIsCorrect(expectedFee) {
    this.adoptionFeeByline.invoke('text').then((text) => {
      cy.getPriceValue(text).should('equal', expectedFee);
    });
  }
}
