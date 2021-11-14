import { Courses } from './Courses';


export const CourseList = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);
    return (
        <div> 
        {coursesArr.map( (course) => <Course course = {course[1]} ></Course>)}
        </div>
    )

}

const Course = ({course}) => {
    return (
        <card >
            {course.course_name}
        </card>
    )

}

export default CourseList;