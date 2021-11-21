describe('Test Course Explorer', () => {

    it('shows more available courses only when corresponding prereqs are selected', () => {
        cy.visit('/');
        cy.get('[data-cy="COMP_SCI 111"]').click();
        cy.get('[data-cy="COMP_SCI 214"]').should('not.exist');
        cy.get('[data-cy="COMP_SCI 211"]').click();
        cy.get('[data-cy="COMP_SCI 214"]');
    });

    it('deleting a prereq should remove classes that depend on that prereq', () => {
        cy.visit('/');
        cy.get('[data-cy="COMP_SCI 111"]').click();
        cy.get('[data-cy="COMP_SCI 211"]').click();
        cy.get('[data-cy-selected="COMP_SCI 211"]').click();
        cy.get('[data-cy="COMP_SCI 214"]').should('not.exist');
    });

});

