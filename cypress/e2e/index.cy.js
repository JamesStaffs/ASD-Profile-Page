describe('Homepage', () => {
    beforeEach(() => {
        // Replace with your actual local or deployed URL
        cy.visit('http://127.0.0.1:5500/index.html');
    });

    it('has a profile heading', () => {
        cy.get('h1').should('contain', 'Profile');
    });

    it('has navigation links to itself and the contact page', () => {
        cy.get('nav a').should('have.length', 2);
        cy.get('nav a').first().should('have.attr', 'href', 'index.html');
        cy.get('nav a').last().should('have.attr', 'href', 'contact.html');
    });

    it('has a profile image with a valid href', () => {
        cy.get('#avatar img').should('have.attr', 'src').then((src) => {
            cy.request(src).its('status').should('eq', 200);
        });
    });

    it('has a profile image which is visible', () => {
        cy.get('#avatar img')
          .should('be.visible')
          .and('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
    });

    it('has a a profile image with alt text', () => {
        cy.get('#avatar img').should('exist');
        cy.get('#avatar img').should('have.attr', 'alt').and('not.be.empty');
    });

    it('has a background section with content', () => {
        cy.get('section#background h2').should('contain', 'Background');
        cy.get('section#background p').should('exist');
    });

    it('has an experience section with content', () => {
        cy.get('section#experience h2').should('contain', 'Experience');
        cy.get('section#experience p').should('exist');
    });

    it('has a goals section with a list of at least two goals', () => {
        cy.get('section#goals h2').should('contain', 'Goals');
        cy.get('section#goals ol').should('exist');
        cy.get('section#goals li').should('have.length.greaterThan', 1);
    });
});