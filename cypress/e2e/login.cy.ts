describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('[data-test-id="email-input-field"]').type('armen+1@investorfuse.com');
    cy.get('[data-test-id="sign-in-btn"]').should('be.disabled');

    cy.get('[data-test-id="password-input-field"]').type('asdasd');
    cy.get('[data-test-id="sign-in-btn"]').should('not.be.disabled');

    cy.get('[data-test-id="email-input-field"]').should('have.value', 'armen+1@investorfuse.com');
    cy.get('[data-test-id="password-input-field"]').should('have.value', 'asdasd');

    cy.get('[data-test-id="sign-in-btn"]').click();

    cy.url().should('include', '/')
  })

  it('should display an error message with invalid credentials', () => {
    cy.get('[data-test-id="email-input-field"]').type('invalid@investorfuse.com');
    cy.get('[data-test-id="sign-in-btn"]').should('be.disabled');

    cy.get('[data-test-id="password-input-field"]').type('invalid');
    cy.get('[data-test-id="sign-in-btn"]').should('not.be.disabled');

    cy.get('[data-test-id="sign-in-btn"]').click();
    cy.get('[data-test-id="error-message"]').contains('Wrong Credentials').should('be.visible')

    cy.get('[data-test-id="email-input-field"]').should('have.value', 'invalid@investorfuse.com');
    cy.get('[data-test-id="password-input-field"]').should('not.have.value', '');
  })
})
