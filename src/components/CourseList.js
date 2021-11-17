import {useState} from 'react';
import {getStartingCourses} from '../utils/coursesUtils';

export const CourseList = () => {

    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [canTake, setCanTake] = useState(getStartingCourses(coursesArr));
    const [selected, setSelected] = useState([]);

    return (

        <>
            <hr></hr>
            <h1> Taken Courses: </h1>
            <div>Click on an available course to add them to your list. To remove a class, click on the taken class to remove it.</div>
            <br></br>
            <div className="course-list">
                {selected.length === 0 ? "Courses taken will appear here." :
                    selected.map((course) => <Courses course={course} setSelected={setSelected}
                    selected={selected} coursesArr={coursesArr} canTake={canTake}
                    setCanTake={setCanTake} action={detake}/>)}
            </div>

            <hr></hr>
            <h1> Available Courses: </h1>
            <div className="course-list">
                {coursesArr.map((course) => <NotSelectedCourses course={course} setSelected={setSelected}
                                                                selected={selected} coursesArr={coursesArr}
                                                                canTake={canTake}
                                                                setCanTake={setCanTake} action={take}/>)}
            </div>
        </>
    )
}

const Courses = ({coursesArr, course, setSelected, selected, canTake, setCanTake, action}) => {
    return (
        course ?
            <div className="card m-1 p-2" onClick={() => {
                action(coursesArr, course, setSelected, selected, canTake, setCanTake);
            }}>
                {course[0]} : {course[1].course_name}
            </div>
            : null
    );

}

const NotSelectedCourses = ({coursesArr, course, setSelected, selected, canTake, setCanTake, action}) => {
    const selectedCoursesName = selected.map(course => course[0]);


    return (
        course ?
            selectedCoursesName.includes(course[0]) ? <div className="card m-1 p-2 bg-primary text-white">
                    {course[0]} : {course[1].course_name}
                </div> :
                ifPreMet(course, selected) && !selectedCoursesName.includes(course[0]) ?
                    <div className="card m-1 p-2" onClick={() => {
                        action(coursesArr, course, setSelected, selected, canTake, setCanTake);
                    }}>
                        {course[0]} : {course[1].course_name}
                    </div> :
                    <div className="card m-1 p-2 bg-secondary text-white">
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
export const removeGuiltyCourses = (selected) => {
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
export const ifPreMet = (course, selected) => {
    const selectedCoursesName = selected.map(course => course[0]);
    return course[1].Prereqs.every(prereq => prereq.some(singleCourse => selectedCoursesName.includes(singleCourse)));
}

export default CourseList;
