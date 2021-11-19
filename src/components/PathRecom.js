import {removeGuiltyCourses} from './CourseList';

const { useState } = require('react');

const PathRecom = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [selected, setSelected] = useState([]);
    const [path, setPath] = useState([]);
    const [area, setArea] = useState([]);

    const areaOfInterests = [
        {area: 'Game Development', courses: ["COMP_SCI 376", "COMP_SCI 377"]},
        {area: 'Software Development', courses: ["COMP_SCI 345", "COMP_SCI 393", "COMP_SCI 394", "COMP_SCI 397-497-5", "COMP_SCI 396-496-18"]},
        {area: 'Computer Network', courses: ["COMP_SCI 340", "COMP_SCI 397-497-12"]}
    ];

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
            <button className="btn btn-outline-secondary btn-sm m-1 col-4" data-cy="calculatePath" onClick={() => findPath([], selected, courses, setPath, selected)}>
                Calculate Path
            </button>

            <hr></hr>
            <div> 
                Don't know what courses to choose? Try select your area of interests:
                <div className="course-list">
                    {areaOfInterests.map(oneArea => <AreaSelector oneArea={oneArea} currentAreas={area} 
                                                                  setArea={setArea} selected={selected} 
                                                                  setSelected={setSelected} coursesJson={courses}/>)}
                </div>    
            
            </div>

            <hr></hr>
            <div className="course-list">
                {coursesArr.map((course) => <SelectableCourse course={course} setSelected={setSelected}
                                                   selected={selected} />)}
            </div>
        </>
    )
}

const AreaSelector = ({oneArea, currentAreas, setArea, selected, setSelected, coursesJson}) => {

    const currentAreaNames = currentAreas.map(cur => cur.area);
    return (

        currentAreaNames.includes(oneArea.area) ?
            <div className="card m-1 p-2 selectedArea text-white" onClick={() => {deselectArea(setArea, currentAreas, oneArea, selected, setSelected)}}>
                <h4> {oneArea.area} </h4>
            </div> :

            <div className="card m-1 p-2" onClick={() => {selectArea(setArea, currentAreas, oneArea, selected, setSelected, coursesJson)}}>
                <h4> {oneArea.area} </h4>
            </div>

    )
}

const selectArea = (setArea, currentAreas, oneArea, selected, setSelected, coursesJson) => {
    const selectedNames = selected.map(singleSelected => singleSelected[0]);
    const newAreas = [...currentAreas, oneArea];
    const newCourses = oneArea.courses.filter(course => !selectedNames.includes(course));;
    setArea(newAreas);
    setSelected([...selected, ...newCourses.map(courseNumber => [courseNumber, coursesJson[courseNumber]])]);

}

const deselectArea = (setArea, currentAreas, oneArea, selected, setSelected) => {
    const newAreas = currentAreas.filter(cur => cur.area !== oneArea.area);
    const deletingCourses = oneArea.courses;
    const newSelected = selected.filter(singleSelected => !deletingCourses.includes(singleSelected[0]));
    setArea(newAreas);
    setSelected(newSelected);
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

    console.log("All Todos: ", todo);

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

        console.log(todo[i]);
        // TODO: Some prereqs are undefined because they are math courses which are not in the json file
        const preReqs = todo[i][1].Prereqs.map(prereq => [prereq[0], courses[prereq[0]]]);
        newTodo = [...newTodo, ...preReqs];
    }
    findPath ([...done, ...todo], newTodo, courses, setPath, selected);
}

export default PathRecom;