const { useState } = require('react');


const PathRecom = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [selected, setSelected] = useState([]);

    return (
        <>
            <hr></hr>
            <h1> Please select your favourite classes: </h1>
            <div className="course-list">
                {coursesArr.map((course) => <SelectableCourses course={course} setSelected={setSelected}
                                                   selected={selected} />)}
            </div>
        </>
    )


}

const SelectableCourses = ({course, setSelected, selected}) => {

    if (!course) {
        return;
    }

    const allSelectedNames = selected.map(single => single[0]);
    return (
        allSelectedNames.includes(course[0]) ?
            <div className="card m-1 p-2 bg-primary text-white" onClick={() => deselect(course, setSelected, selected)}>
                {course[0]} : {course[1].course_name}
            </div> :
            <div className="card m-1 p-2" onClick={() => select(course, setSelected, selected)}>
                {course[0]} : {course[1].course_name}
            </div> 


    );
}

const select = (course, setSelected, selected) => {
    setSelected([...selected, course])
}

const deselect = (course, setSelected, selected) => {
    setSelected(selected.filter(single => single[0] !== course[0]));
}

// const findPath = ({selected, allCourses}) => (
//     <>
//       <button className="btn btn-outline-secondary btn-sm m-1" onClick={() => setTool(tool)}>
//                 {tool}
//       </button>
//     </>
// );


export default PathRecom;