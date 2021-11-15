import {useState} from 'react';
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
    return (
        course ? 
            <div className="card m-1 p-2" onClick={() => {detake(coursesArr, course, setSelected, selected, canTake, setCanTake);}}>
                {course[0]} : {course[1].course_name}
            </div>
        : null
    );

}

const CanTakeCourse = ({coursesArr, course, setSelected, selected, canTake, setCanTake}) => {

    if (!course) {
        return null;
    }

    return (
        course ?
            <div className="card m-1 p-2" onClick={() => {take(coursesArr, course, setSelected, selected, canTake, setCanTake);}}>
                {course[0]} : {course[1].course_name}
            </div>
            : null
    );
}
const take = (coursesArr, course, setSelected, selected, canTake, setCanTake) => {

    // Add this course to Selected
    // Note: Create a new varialbe first, so it's to avoid asynchrounous effect.
    let newSelected = selected ? [...selected, course] : [course];
    setSelected(newSelected);

    // Note: Create a new varialbe first, so it's to avoid asynchrounous effect.
    let newCanTake = canTake.filter((singleCanTake) => course[1].course_name !== singleCanTake[1].course_name)
    setCanTake(checkCanTakeCourses(coursesArr, newSelected, newCanTake, setCanTake));
}

const detake = (coursesArr, course, setSelected, selected, canTake, setCanTake) => {

    // Remove this course from selected courses. Create Variable first to avoid asynchrounous effect.
    let selectedNew = removeGuiltyCourses(selected.filter((singleSelected) => course[1].course_name !== singleSelected[1].course_name), canTake)
    setSelected(selectedNew);

    // Update CanTake courses becauase we just deselect a course.
    setCanTake(checkCanTakeCourses(coursesArr, selectedNew));
}

// Recursively Remove Unsatisfiable courses
const removeGuiltyCourses = (selected) => {
    let filtered = selected.filter((single) => ifPreMet(single, selected));

    // if filtered's and selected's lengths are equal, end of recursion
    // else: continue removing courses
    return filtered.length === selected.length ? filtered : removeGuiltyCourses(filtered);
}

// get canTake courses from all courses based on selected courses. 
const checkCanTakeCourses = (coursesArr, selected) => (

    // If:
    //    1: Prerequistes met
    //    2: this courses hasn't been selected yet
    coursesArr.filter((course) => ifPreMet(course, selected) && !courseSelectedAlready(course, selected))
);

const courseSelectedAlready = (course, selected) => (

    // Check if course is in selected
    selected.some((singleSelected) => singleSelected[1].course_name === course[1].course_name)
);

const ifPreMet = (course, selected) => {
    let preArr = course[1].Prereqs;
    selected.forEach((selectedCourse) => {
        preArr = preArr.filter((singlePreArr) => !singlePreArr.includes(selectedCourse[0]));
    });
    return preArr.length === 0;
}
export default CourseList;
