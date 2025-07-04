describe('Contact Form', () => {
    
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/contact.html');
    });

    it('has a profile heading', () => {
        cy.get('h1').should('contain', 'Contact James');
    });

    it('has navigation links to itself and the contact pages', () => {
        cy.get('nav').within(() => {
            cy.get('a[href="index.html"]').should('exist');
            cy.get('a[href="contact.html"]').should('exist');
            cy.get('a[href="contact-react.html"]').should('exist');
        });
    });

    it('submits successfully to webhook.site', () => {
        cy.get('#full_name').type('John Doe');
        cy.get('#email').type('john@example.com');
        cy.get('#reply').check();
        cy.get('#priority').select('High');
        cy.get('#message').type('This is a test message.');

        cy.get('form#contact').submit();

        cy.get('#contact-success').should('be.visible');
        cy.get('#contact-failure').should('not.be.visible');
    });

    it('submits successfully', () => {
        cy.get('#full_name').type('John Doe');
        cy.get('#email').type('john@example.com');
        cy.get('#reply').check();
        cy.get('#priority').select('High');
        cy.get('#message').type('This is a test message.');

        cy.intercept('POST', 'https://webhook.site/**', {
            statusCode: 200
        }).as('formSubmit');

        cy.get('form#contact').submit();
        cy.wait('@formSubmit');

        cy.get('#contact-success').should('be.visible');
        cy.get('#contact-failure').should('not.be.visible');
    });

    it('displays an error on submission failure', () => {
        cy.get('#full_name').type('John Doe');
        cy.get('#email').type('john@example.com');
        cy.get('#reply').check();
        cy.get('#priority').select('High');
        cy.get('#message').type('This is a test message.');

        cy.intercept('POST', 'https://webhook.site/**', {
            statusCode: 500
        }).as('formSubmit');

        cy.get('form#contact').submit();
        cy.wait('@formSubmit');

        cy.get('#contact-failure').should('be.visible');
        cy.get('#contact-success').should('not.be.visible');
    });

    it('requires full name field to be filled', () => {
        cy.get('#full_name').should('have.attr', 'required');
        cy.get('label[for=full_name] .required-field').should('exist');
    });

    it('requires message field to be filled', () => {
        cy.get('#message').should('have.attr', 'required');
        cy.get('label[for=message] .required-field').should('exist');
    });
});