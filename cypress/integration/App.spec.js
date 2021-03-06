describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('opens with Course Explorer Button', () => {
        cy.visit('/');
        cy.get('[data-cy=CourseExplorer]').should('contain', 'Course Explorer');
    });
    it('opens with Path Recommendation Button', () => {
        cy.visit('/');
        cy.get('[data-cy=PathRecommendation]').should('contain', 'Path Recommendation');
    });
    it('opens with All Courses Button', () => {
        cy.visit('/');
        cy.get('[data-cy=AllCourses]').should('contain', 'All Courses');
    });

    it('shows Course Explorer page when clicked', () => {
        cy.visit('/');
        cy.get('[data-cy=CourseExplorer]').click();
        cy.get('[data-cy=takenCourses]').should('contain', 'Courses taken will appear here.');
    });
    it('shows Path Recommendation page when clicked', () => {
        cy.visit('/');
        cy.get('[data-cy=PathRecommendation]').click();
        cy.get('[data-cy=calculatePath]').should('contain', 'Calculate Path');
    });
    it('shows All Courses page when clicked', () => {
        cy.visit('/');
        cy.get('[data-cy=AllCourses]').click();
        cy.get('[data-cy=allCourses]').should('contain', 'COMP_SCI 110 : Intro to Computer Programming');
    });

    it('shows All Courses card body is visible accordion is clicked, and hidden on second click', () => {
        cy.visit('/');
        cy.get('[data-cy=AllCourses]').click();
        cy.get('[data-cy=COMP_ENG_203_header]').click();
        cy.get('[data-cy=COMP_ENG_203_body]')
            .should('be.visible');
        cy.get('[data-cy=COMP_ENG_203_header]').click();
        cy.get('[data-cy=COMP_ENG_203_body]')
            .should('be.hidden');

    })

});