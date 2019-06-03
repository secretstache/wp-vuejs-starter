beforeEach("Automatically login to WordPress dashboard as admin user", function() {
    //cy.exec("npm run db-snapshot-reset"); // You can also reset the database before each test
    cy.visit("/wp-login.php?autologin=wordpress");
    cy.url().should("contain", "wp-admin");
});

describe("WP Admin Page", function() {
    it("Add and rmeove todo item", function() {
        const todoContainer = () => cy.get("#wp-react-component-library > div > div.wp-styleguide--buttons");
        cy.get("#toplevel_page_wp-react-component-library > a").click();
        todoContainer()
            .children("input")
            .type("Test Todo Item")
            .next()
            .click();
        todoContainer()
            .find("> ul > li > label:first")
            .should("have.text", "Test Todo Item")
            .children(":checkbox")
            .check()
            .should("be.checked")
            .parent()
            .parent()
            .find("a")
            .click();
        todoContainer()
            .find("> ul > li")
            .should("have.text", "No entries");
    });

    it("Test REST API response when clicking URL", function() {
        cy.get("#toplevel_page_wp-react-component-library > a").click();
        cy.on("window:alert", (text) => {
            expect(text).to.contain("AuthorURI");
        });
        cy.get("#wp-react-component-library > div > div:nth-child(3) > p > a").click();
    });
});
