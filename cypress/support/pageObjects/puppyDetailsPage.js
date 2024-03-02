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

  // method verifies that puppy details are visible and correct
  // depending on granularity of checks on the project, we might check only
  // presence of the elements or the content itself as well
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
      // formatString is a custom method that trims string, removes carriage returns and double spaces
      cy.formatString(text).should('contain', targetPuppy.description);
    });
    this.adoptionFeeByline.should('be.visible');
  }

  verifyAdoptionFeeIsCorrect(expectedFee) {
    this.adoptionFeeByline.invoke('text').then((text) => {
      // getPriceValue is a custom method that uses regexp to get numeric price value
      cy.getPriceValue(text).should('equal', expectedFee);
    });
  }
}
