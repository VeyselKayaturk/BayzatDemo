/// <reference types="Cypress" />

const chai = require('chai')
, assert = chai.assert
, expect = chai.expect
, should = chai.should()

describe('Login', function(){
    Cypress.config('pageLoadTimeout', 100000)                  
    before( function(){
        cy.LoginMethod()                                                              // call the LoginMethod to Login to site
    })
    
    Cypress.on('uncaught:exception', (err, runnable) => {                             // application doesn't allow to create totaly same employee due to same email, for this I throws an exaption error to pass this application bug!
        return false
      })

    it('LogintoBayzat', function(){
        cy.url().should('include', 'https://www.bayzat.com/enterprise/dashboard')     // verify the correct page url is launched
        cy.contains('View Team').should('be.visible').click()                         // Open the View Team page
        expect('.ember-view').to.exist                                                // verifying the list of employee exists

        cy.contains('Add Employees').should('be.visible').click()
        cy.get('.btn').contains('Add Employee').should('be.visible').click()
        
        for(let i=0; i<=1; i++){                                                      // add same employee two times
            // Add Employee section informations
            cy.get('input[name="preferredName"]').type('Veysel')
            cy.get('input[name="firstName"]').type('Veysel')
            cy.get('input[name="lastName"]').type('Kayaturk')
            cy.get('input[name="dateOfBirthFormatted"]').type('01/09/1993')
            cy.contains('Nationality').should('be.visible').click()                  // this line written to close the calender popup
            // select nationality
            cy.get('.ember-power-select-placeholder').contains('Please select nationality').should('be.visible').click()
            cy.get('input[type="search"]').type('Turkey') 
            cy.get('.ember-power-select-option').contains('Turkey').should('be.visible').click()
            // select gender
            cy.get('.ember-power-select-placeholder').contains('Please select gender').should('be.visible').click()
            cy.get('.ember-power-select-option').contains('Male').should('be.visible').click()

            // Add Contact section information
            cy.get('input[name="mobileNumber"]').type('905334569379')
            cy.get('input[name="workEmail"]').type('veysel.kayaturk93@gmail.com')
            cy.get('input[name="officeNumber"]').type('905334569378')

            // Add Work section information
            cy.get('input[name="position"]').type('Tester')
            cy.get('input[name="hiredAtFormatted"]').type('01/02/2017')
            cy.contains('Probation End Date').should('be.visible').click()                  // this line written to close the calender popup
            cy.get('input[name="probationEndDateFormatted"]').type('01/05/2017')
            cy.contains('Workweek').should('be.visible').click()                            // this line written to close the calender popup
            // select legal country of residence
            cy.get('.ember-power-select-placeholder').contains('Please select country of residence').should('be.visible').click()
            cy.get('input[type="search"]').type('Turkey') 
            cy.get('.ember-power-select-option').contains('Turkey').should('be.visible').click()

            
            cy.get('.btn').contains('Yes').should('be.visible').click()                       // radio button selection

            //create and add employee
            cy.get('.btn').contains('Create and add another').should('be.visible').click()
            cy.wait(3000)
        }
        cy.get('.media-right').should('be.visible').click()                                   // close the error message when second same employee added
        cy.wait(3000)
        cy.contains('View Team').should('be.visible').click()
        
        cy.get('.btn').contains('Abandon').should('be.visible').click()                      //close the popup to accept the second user is not be added due to unecepted to adding with same email
        
        cy.contains('View Team').should('be.visible').click()                                // turn to view team page and ensure employee list is exist
        expect('VIEW TEAM').to.exist
        expect('.ember-view').to.exist
        

        
        cy.get('input[placeholder="Search by employee name"]').type('Veysel Kayaturk')      // Newly added employee can be searched and filtered from search box
        cy.wait(2000)

        
        cy.get('.text-center').then(($el) => {                                             //check the checkbox of newly added employee
            Cypress.dom.isVisible($el) 
        })
        cy.get('.text-center').eq(3).should('be.visible').click({ multiple: true })
        
        cy.wait(2000)

        
        cy.get('.btn').then(($el) => {                                                    //delete newly added employee
            Cypress.dom.isVisible($el) 
        })
        cy.get('.btn').eq(7).should('be.visible').click({ multiple: true })
        cy.wait(2000)
        cy.get('.btn').contains('Confirm').should('be.visible').click()
        cy.wait(2000)

        cy.contains('Logout').should('be.visible').click()                               // Logout from application
        
        cy.url().should('include', 'https://www.bayzat.com/enterprise/dashboard/login')  // verify that login page is opened

        cy.visit('https://www.bayzat.com/')                                             // turn to main page and verify that LOGIN button is exist
        expect('Login').to.exist
        
    })
})
