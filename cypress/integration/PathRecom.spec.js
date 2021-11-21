describe('Test Path Recommendation', () => {
    // it(', () => {
    //     cy.visit('/');
    //     cy.get('[data-cy=PathRecommendation]').click();

    // }

    it('shows more available courses only when corresponding prereqs are selected', () => {
        cy.visit('/');
        cy.get('[data-cy=PathRecommendation]').click();
        cy.get('[data-cy="COMP_SCI 110"]').click();
        cy.get('[data-cy="calculatePath"]').click();
        cy.get('[data-cy-path="COMP_SCI 110"]');
    });

    it('delete courses from recommended list when selected course is deselected', () => {
        cy.visit('/');
        cy.get('[data-cy=PathRecommendation]').click();
        cy.get('[data-cy="COMP_SCI 110"]').click();
        cy.get('[data-cy="COMP_SCI 214"]').click();
        cy.get('[data-cy="calculatePath"]').click();

        cy.get('[data-cy-path="COMP_SCI 110"]');

        cy.get('[data-cy-select="COMP_SCI 110"]').click();
        cy.get('[data-cy="calculatePath"]').click();

        cy.get('[data-cy-path="COMP_SCI 110"]').should('not.exist');
    });

});