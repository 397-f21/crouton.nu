import { Queue } from "./Queue"

export const topoSort = (targets, takens) => {

    const courses = require('../files/toy_courses.json');
    const startingCourses = getStartingCourses(takens, courses);

    // TODO:
    // getIndegree();
    // BFS();

    let queue = new Queue();

}

const getStartingCourses = (takens, courses) => {
    const coursesList = Object.entries(courses).map((tuple) => {
        return [tuple[0], (({course_name, Prereqs}) => ({course_name, Prereqs}))(tuple[1])]
    });
    const startingCourses = coursesList.filter( (course) => course[1].Prereqs.length === 0);

    //TODO: add takens to starting courses

    return startingCourses;

    /*
        coursesList Example:

        [
            'COMP_SCI 50', 
            {
                course_name: 'Fundamentals of Computer Programming 1.5', 
                Prereqs: []
            }
        ]

    */
}

//TODO: get Indegrees
const getIndegree = (courses) => {

    return null;
}