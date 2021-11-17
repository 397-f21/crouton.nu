import {removeGuiltyCourses} from './CourseList';

const { useState } = require('react');

const PathRecom = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [selected, setSelected] = useState([]);
    const [path, setPath] = useState([]);

    return (
        <>
            <hr></hr>
            {
                path.length === 0 ?
                null:
                <div>
                    <h3> Here is your path: </h3>
                    <div className = "col-6">
                        {path.map(course => <SimpleCourse course = {course}/>) }
                    </div>
                    <hr></hr>
                </div>
            }
            <h3> Please select your favourite classes: </h3>
            <div>Select a set of courses you want to take. We will figure out a path and take care of prerequisites for you! </div>
            <button className="btn btn-outline-secondary btn-sm m-1 col-4" onClick={() => findPath([], selected, courses, setPath, selected)}>
                Calculate Path
            </button>

            <div className="course-list">
                {coursesArr.map((course) => <SelectableCourse course={course} setSelected={setSelected}
                                                   selected={selected} />)}
            </div>
        </>
    )


}

const SelectableCourse = ({course, setSelected, selected}) => {

    if (!course) {
        return;
    }

    const allSelectedNames = selected.map(single => single[0]);
    return (
        allSelectedNames.includes(course[0]) ?
            <div className="card m-1 p-2 bg-primary text-white" onClick={() => deselect(course, setSelected, selected)}>
                {course[0]} : {course[1].course_name}
            </div> :
            <div className="card m-1 p-2" onClick={() => select(course, setSelected, selected)}>
                {course[0]} : {course[1].course_name}
            </div> 
    );
}

const SimpleCourse = ({course}) => {
    if (!course) {
        return null;
    }
    return (
        <div className="card m-1 p-2">
            {course[0]} : {course[1].course_name}
        </div> 
    );
}

const select = (course, setSelected, selected) => {
    setSelected([...selected, course])
}

const deselect = (course, setSelected, selected) => {
    setSelected(selected.filter(single => single[0] !== course[0]));
}

const removeUnnecessaryCourses = (path, selected) => {
    let filteredPath = [...path];
    const courseNames = selected.map((course) => course[0]);
    for (let i = 0; i < path.length; i++) {

        let newList = filteredPath.filter(course => course[0] !== path[i][0]);
        const blah = removeGuiltyCourses(newList);
        const blahNames = blah.map((course) => course[0]);


        // After removing class path[i], if blah still contains all the selected course
        // Then this course can be removed.
        if(courseNames.every((course) => blahNames.includes(course))) {
            filteredPath = filteredPath.filter(course => course[0] !== path[i][0])
        }
    }
    return filteredPath;
}

// const removeUnnecessaryCoursesOld = (path, selected) => {
//     let filteredPath = [];
//     const courseNames = selected.map((course) => course[0]);
//     for (let i = 0; i < path.length; i++) {
//         if (courseNames.includes(path[i][0])) {
//             filteredPath.push(path[i]);
//             continue;
//         } 
//         let newList = path.filter((course,indx) => indx !== i);
//         const blah = removeGuiltyCourses(newList);
//         const blahNames = blah.map((course) => course[0]);
//         if(!courseNames.every((course) => blahNames.includes(course))) {
//             filteredPath.push(path[i]);
//         }
//         //const end = removeGuiltyCourses(newList);
//     }
//     return filteredPath;
// }

const findPath = (done, todo, courses, setPath, selected) => {

    if (todo.length === 0){
        
        // Remove Duplicates;
        let seen = new Set();
        const result = done.filter(single => {
            const haveSeen = seen.has(single[0]);
            seen.add(single[0]);
            return !haveSeen;
        })
        
        let filteredResult = removeUnnecessaryCourses(result, selected);

        // TODO: Not just reverse(), need a topological sorting.
        setPath(filteredResult.sort());
        return;
    }

    let newTodo = [];
    for (let i = 0; i < todo.length; i++) {

        // TODO: Some prereqs are undefined because they are math courses which are not in the json file
        const preReqs = todo[i][1].Prereqs.map(prereq => [prereq[0], courses[prereq[0]]]);
        newTodo = [...newTodo, ...preReqs];
    }
    findPath ([...done, ...todo], newTodo, courses, setPath, selected);
}

export default PathRecom;