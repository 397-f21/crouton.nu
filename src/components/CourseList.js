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
                {selected.map((course) => <Courses course={course} setSelected={setSelected}
                                                 selected={selected} coursesArr={coursesArr} canTake={canTake}
                                                 setCanTake={setCanTake} action={detake}/>)}
            </div>


            <h1> Can Take: </h1>
            <div className="course-list">
                {canTake.map((course) => <Courses course={course} setSelected={setSelected}
                                                 selected={selected} coursesArr={coursesArr} canTake={canTake}
                                                 setCanTake={setCanTake} action={take}/>)}
            </div>
        </>
    )
}

const Courses = ({coursesArr, course, setSelected, selected, canTake, setCanTake, action}) => {
    return (
        course ? 
            <div className="card m-1 p-2" onClick={() => {action(coursesArr, course, setSelected, selected, canTake, setCanTake);}}>
                {course[0]} : {course[1].course_name}
            </div>
        : null
    );

}

const take = (coursesArr, course, setSelected, selected, canTake, setCanTake) => {

    // Add this course to Selected
    // Note: Create a new varialbe first, to avoid asynchrounous effect.
    let newSelected = selected ? [...selected, course] : [course];
    setSelected(newSelected);

    // Note: Create a new varialbe first, to avoid asynchrounous effect.
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
// if filtered's and selected's lengths are equal, end of recursion
// else: continue removing courses
const removeGuiltyCourses = (selected) => {
    let filtered = selected.filter((single) => ifPreMet(single, selected));
    return filtered.length === selected.length ? filtered : removeGuiltyCourses(filtered);
}

// get canTake courses from all courses based on selected courses. 
// If:
//    1: Prerequistes met
//    2: this courses hasn't been selected yet
const checkCanTakeCourses = (coursesArr, selected) => (
    coursesArr.filter((course) => ifPreMet(course, selected) && !courseSelectedAlready(course, selected))
);

// Check if course is in selected
const courseSelectedAlready = (course, selected) => (
    selected.some((singleSelected) => singleSelected[1].course_name === course[1].course_name)
);


// if ALL elements in preArr have SOME in selected
// then prerequisites are met
const ifPreMet = (course, selected) => {
    const selectedCoursesName = selected.map(course => course[0]);
    return course[1].Prereqs.every(prereq => prereq.some(singleCourse => selectedCoursesName.includes(singleCourse))); 
}

export default CourseList;
