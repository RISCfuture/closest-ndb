// https://docs.cypress.io/api/table-of-contents

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/', {
      // TEMP until I figure out why cypress geolocation permissions isn't working
      onBeforeLoad({ navigator }) {
        cy.stub(navigator.geolocation, 'getCurrentPosition')
          .callsArgWith(0, { coords: { latitude: 36.0, longitude: -121.0 } });
      },
    });
    cy.contains('h1', 'Where’s the closest NDB to me right now?');
  });
});
