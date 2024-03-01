export class PuppiesList {
  get puppiesList() {
    return cy.get('div[class^=list_line_]');
  }

  verifyPuppyIsVisible(targetPuppy) {
    this.puppiesList.contains(targetPuppy.name).should('be.visible');
  }

  viewPuppyDetails(targetPuppy) {
    cy.get(`div[class^=list_line_]:has(div.name h3:contains('${targetPuppy.name}'))`)
      .find('input[value="View Details"]')
      .click();
  }
}
