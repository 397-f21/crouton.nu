import {useState} from 'react';
import {getStartingCourses} from '../utils/coursesUtils';
import {Courses} from './Courses';


export const CourseList = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [canTake, setCanTake] = useState(getStartingCourses(coursesArr));
    const [selected, setSelected] = useState([]);

    return (

        <>
            <div className="course-list">
                {canTake.map((course) => <Course course={course} setSelected={setSelected}
                                                 selected={selected}></Course>)}
            </div>

            <div className="course-list">
                {selected.map((ele) => <div className="card m-1 p-2"> {ele[1].course_name} </div>)}
            </div>

        </>
    )
}

const Course = ({course, setSelected, selected}) => {

    if (!course) {
        return null;
    }

    return (
        <div className="card m-1 p-2" onClick={() => {
            take(course, setSelected, selected);
        }}>
            {course[0]} : {course[1].course_name}
        </div>
    );
}
const take = (course, setSelected, selected) => {
    selected.includes(course) ? setSelected(selected.filter((element) => element[1].course_name !== course[1].course_name)) : selected ? setSelected([...selected, course]) : setSelected([course]);
}

const ifPreMet = (course, selected, setCanTake, canTake) => {
    let preArr = course[1].Prereqs;
    selected.forEach((selectedCourse) => {
        preArr = preArr.filter((singlePreArr) => singlePreArr.includes(selectedCourse[0]));
    });

    console.log(preArr.length === 0);

}
export default CourseList;