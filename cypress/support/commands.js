Cypress.Commands.add("LoginMethod", () => {
    cy.visit('https://www.bayzat.com/')
    cy.contains('Login').should('be.visible').click()

        cy.get('form').within(($form) => {
            cy.get('input[type="email"]').type('test+testcompany@bayzat.com')
            cy.get('input[type="password"]').type('123456789')
            cy.get('.btn').contains('Log In').should('be.visible').click()                                
        })
        cy.contains('Good to see you Test', {timeout: 10000}).should('be.visible')
})
