describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with Course Explorer Button', () => {
        cy.visit ('/');
        cy.get('[data-cy=CourseExplorer]').should('contain', 'Course Explorer');
    });
    it ('opens with Path Recommendation Button', () => {
        cy.visit ('/');
        cy.get('[data-cy=PathRecommendation]').should('contain', 'Path Recommendation');
    });
    it ('opens with All Courses Button', () => {
        cy.visit ('/');
        cy.get('[data-cy=AllCourses]').should('contain', 'All Courses');
    });
    
  });