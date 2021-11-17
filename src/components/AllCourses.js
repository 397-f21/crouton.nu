import 'bootstrap/dist/css/bootstrap.min.css';
import {Accordion} from "react-bootstrap";

const {useState} = require('react');

const AllCourses = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    return (
        <>
            <hr/>
            <h1> All Courses: </h1>
            <div className="course-list">
                {coursesArr.map((course) => <DetailedCourses course={course}/>)}
            </div>
        </>
    )


}

const DetailedCourses = ({course}) => {

    if (!course) {
        return;
    }
    let courseNo = course[0].split(" ")[1];
    let link = `https://www.mccormick.northwestern.edu/computer-science/academics/courses/descriptions/${courseNo}.html`;
    // TODO Fix the ugliness
    // return (
    //     <div className="card m-1 p-2">
    //         {course[0]} : {course[1].course_name}
    //         <br/>
    //         {course[1].fall_time ? "\nFall: " + course[1].fall_time + ' \n' + course[1].fall_instructor : ""}
    //         {course[1].winter_time ? "\nWinter: " + course[1].winter_time + ' \n' + course[1].winter_instructor : ""}
    //         {course[1].spring_time ? "\nSpring: " + course[1].spring_time + ' \n' + course[1].spring_instructor : ""}
    //         {course[1].other.Prerequisites ? "\nPrerequisites: " + course[1].other.Prerequisites : '\nPrerequisites: None'}
    //         <button className="btn btn-outline-primary btn-sm m-1" onClick={() => window.open(link, '_blank')}>
    //             Course Detail
    //         </button>
    //     </div>
    //
    //
    // );

    return (

        <Accordion className="m-1 p-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{course[0]} : {course[1].course_name}</Accordion.Header>
                <Accordion.Body>
                    {course[1].fall_time ? "\nFall: " + course[1].fall_time + ' \n' + course[1].fall_instructor : ""}
                    {course[1].winter_time ? "\nWinter: " + course[1].winter_time + ' \n' + course[1].winter_instructor : ""}
                    {course[1].spring_time ? "\nSpring: " + course[1].spring_time + ' \n' + course[1].spring_instructor : ""}
                    {course[1].other.Prerequisites ? "\nPrerequisites: " + course[1].other.Prerequisites : '\nPrerequisites: None'}
                    <button className="btn btn-outline-primary btn-sm m-1"
                            onClick={() => window.open(link, '_blank')}>
                        Course Detail
                    </button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    );
}


export default AllCourses;