import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from "react-bootstrap";

const AllCourses = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    return (
        <>
            <hr />
            <h1> All Courses: </h1>
            <div className="course-list" data-cy="allCourses">
                {coursesArr.map((course) => <DetailedCourses course={course} />)}
            </div>
        </>
    )


}

const DetailedCourses = ({ course }) => {

    if (!course) {
        return;
    }
    let courseNo = course[0].split(" ")[1];
    let link = `https://www.mccormick.northwestern.edu/computer-science/academics/courses/descriptions/${courseNo}.html`;
    return (
        <Accordion className="m-1 p-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{course[0]} : {course[1].course_name}</Accordion.Header>
                <Accordion.Body>
                    <CourseBody course={course} link={link} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

const CourseBody = ({ course, link }) => {
    const fall = course[1].fall_time ? course[1].fall_time + ' \n' + course[1].fall_instructor : "";
    const winter = course[1].winter_time ? course[1].winter_time + ' \n' + course[1].winter_instructor : "";
    const spring = course[1].spring_time ? course[1].spring_time + ' \n' + course[1].spring_instructor : "";
    const prereq = course[1].other.Prerequisites ? course[1].other.Prerequisites : 'None';
    const fallLineBreak = course[1].fall_time ? <br /> : "";
    const winterLineBreak = course[1].winter_time ? <br /> : "";
    const springLineBreak = course[1].spring_time ? <br /> : "";
    const prereqLineBreak = course[1].other.Prerequisites ? <br /> : "";
    const button = <button className="btn btn-outline-primary btn-sm m-1" onClick={() => window.open(link, '_blank')}> Course Detail </button>;
    const fallTitle = course[1].fall_time ? <strong>Fall:</strong> : "";
    const winterTitle = course[1].winter_time ? <strong>Winter:</strong> : "";
    const springTitle = course[1].spring_time ? <strong>Spring:</strong> : "";
    const prereqTitle = <strong>Prerequisites:</strong>;
    return (
        <>
            {fallTitle} {fall} {fallLineBreak}
            {winterTitle} {winter} {winterLineBreak}
            {springTitle} {spring} {springLineBreak}
            {prereqTitle} {prereq} {prereqLineBreak}
            {button}
        </>
    )
}


export default AllCourses;