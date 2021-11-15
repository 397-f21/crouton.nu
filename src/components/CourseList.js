import {useEffect, useState} from 'react';
import {getStartingCourses} from '../utils/coursesUtils';




export const CourseList = () => {

    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [canTake, setCanTake] = useState(getStartingCourses(coursesArr));
    const [selected, setSelected] = useState([]);

    return (

        <>
            <h1> Selected: </h1>
            <div className="course-list">
                {selected.map((course) => <SelectedCourse course={course} setSelected={setSelected}
                                                 selected={selected} coursesArr={coursesArr} canTake={canTake}
                                                 setCanTake={setCanTake}/>)}
            </div>


            <h1> Can Take: </h1>
            <div className="course-list">
                {canTake.map((course) => <CanTakeCourse course={course} setSelected={setSelected}
                                                 selected={selected} coursesArr={coursesArr} canTake={canTake}
                                                 setCanTake={setCanTake}/>)}
            </div>
        </>
    )
}

const SelectedCourse = ({coursesArr, course, setSelected, selected, canTake, setCanTake}) => {
    if (!course) {
        return null;
    }

    return (
        <div className="card m-1 p-2" onClick={() => {detake(coursesArr, course, setSelected, selected, canTake, setCanTake);}}>
            {course[0]} : {course[1].course_name}
        </div>
    );

}

const CanTakeCourse = ({coursesArr, course, setSelected, selected, canTake, setCanTake}) => {

    if (!course) {
        return null;
    }

    return (
        <div className="card m-1 p-2" onClick={() => {take(coursesArr, course, setSelected, selected, canTake, setCanTake);}}>
            {course[0]} : {course[1].course_name}
        </div>
    );
}
const take = (coursesArr, course, setSelected, selected, canTake, setCanTake) => {

    // Add this course to Selected
    let newSelected = selected ? [...selected, course] : [course];
    setSelected(newSelected);

    let newCanTake = canTake.filter((singleCanTake) => course[1].course_name !== singleCanTake[1].course_name)

    console.log("canTake: ", checkCanTakeCourses(coursesArr, newSelected, newCanTake, setCanTake));
    setCanTake(checkCanTakeCourses(coursesArr, newSelected, newCanTake, setCanTake));
}

const detake = (coursesArr, course, setSelected, selected, canTake, setCanTake) => {

    let selectedNew = selected.filter((singleSelected) => course[1].course_name !== singleSelected[1].course_name)
    let selectedNewNew = removeGuiltyCourses(selectedNew, canTake)
    setSelected(selectedNewNew);
    setCanTake(checkCanTakeCourses(coursesArr, selectedNewNew));
    console.log("selected: ", removeGuiltyCourses(selectedNew))
}

// Recursively Remove Unsatisfiable courses
const removeGuiltyCourses = (selected, canTake) => {
    let filtered = selected.filter((single) => ifPreMet(single, selected));
    return filtered.length === selected.length ? filtered : removeGuiltyCourses(filtered);
}

const checkCanTakeCourses = (coursesArr, selected) => {
    console.log("selected: ", selected);
    return coursesArr.filter((course) => ifPreMet(course, selected) && !courseSelectedAlready(course, selected));
}

const courseSelectedAlready = (course, selected) => {
    return selected.some((singleSelected) => singleSelected[1].course_name === course[1].course_name);
}

const ifPreMet = (course, selected) => {
    let preArr = course[1].Prereqs;
    selected.forEach((selectedCourse) => {
        preArr = preArr.filter((singlePreArr) => !singlePreArr.includes(selectedCourse[0]));
    });
    return preArr.length === 0;
}
export default CourseList;