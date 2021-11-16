const {useState} = require('react');


const AllCourses = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    return (
        <>
            <hr></hr>
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
    return (
        <div className="card m-1 p-2">
            {course[0]} : {course[1].course_name}
            <br/>
            {course[1].fall_time ? "\r\nFall: " + course[1].fall_time + ' \r\n' + course[1].fall_instructor : ""}
            {course[1].winter_time ? "\r\nWinter: " + course[1].winter_time + ' \r\n' + course[1].winter_instructor : ""}
            {course[1].spring_time ? "\r\nSpring: " + course[1].spring_time + ' \r\n' + course[1].spring_instructor : ""}
            {course[1].other.Prerequisites ? "\r\nPrerequisites: " + course[1].other.Prerequisites : '\r\nPrerequisites: None'}
            <button className="btn btn-outline-primary btn-sm m-1" onClick={() => window.open(link, '_blank')}>
                Course Detail
            </button>
        </div>


    );
}



export default AllCourses;