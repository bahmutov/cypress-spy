/// <reference types="cypress" />
describe('Google gtag events', () => {

    // Cypress.on('window:before:load', (win) => {
    //     // because this is called before any scripts
    //     // have loaded - the ga function is undefined
    //     // so we need to create it.
    //     win.gtag = cy.spy().as('gtag')
    // })

    // Cypress.on('window:before:load', (win) => {
    //     // because this is called before any scripts
    //     // have loaded - the ga function is undefined
    //     // so we need to create it.
    //     win.gtag = cy.stub().as('gtag')
    //     // cy.spy(win, '@gtag-stub').as('gtag')
    //     // cy.spy(win, 'gtag').as('gtag')
    // })

    // beforeEach(function () {
    //     cy.intercept('www.googletagmanager.com', { statusCode: 503 })
    //     // cy.visit('/index.html')
    // })

    it('visit index page 1', () => {

        cy.visit('/index.html')
            .contains('gtag test')
            .should('exist')
    })

    it('has gtag', () => {
        cy.visit('/index.html')
            .then(win => {
            expect(win).to.have.property('gtag')
        })
    })

    it('visit index page 2', () => {
        // cy.visit('/index.html')
        cy.visit('/index.html', {
            onBeforeLoad(win) {
                // cy.spy(win, 'gtag').as('gtag')
            },
        })
        cy.get('@gtag').should('be.called')

    })

    it('visit index page 2', () => {
        cy.visit('/index.html', {
            onBeforeLoad(win) {
                cy.spy(win, 'gtag').as('gtag')
            },
        })

        cy.get('@gtag').should('be.called')
        cy.get('@gtag').should('be.called', 'event', 'view_item')
    })

    it('visit index page 3', () => {
        cy.visit('/index.html')
        cy.window().its('gtag')
        cy.window().then((win) => {
            cy.spy(win, 'gtag').as('gtag');
        })

        cy.get('@gtag').should('be.called')
        cy.get('@gtag').should('be.called', 'event', 'view_item')
    })

    it.only('visit index page 4', () => {
        const gtag = cy.stub().as('gtag')
        cy.on('window:before:load', (win) => {
            console.log('win before load')
            Object.defineProperty(win, 'gtag', {
                // configurable: false,
                get: () => gtag,
                set: () => { },
            })
        })
        cy.visit('/index.html')

        cy.get('@gtag').should('be.called')
        cy.get('@gtag').should('be.called', 'event', 'view_item')
    })
})
