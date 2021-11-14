import { useState } from 'react';
import { getStartingCourses } from '../utils/coursesUtils';
import { Courses } from './Courses';


export const CourseList = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [taken, setTaken] = useState(getStartingCourses(coursesArr));

    return (
        <div className="course-list">
            {taken.map( (course) => <Course course = {course} ></Course>)}
        </div>
    )
}

const Course = ({course}) => {

    if (!course){
        return null;
    }

    return (
        <div className="card m-1 p-2">
            {course[0]} : {course[1].course_name}
        </div>
    );
}

export default CourseList;