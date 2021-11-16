const { useState } = require('react');
const PathRecom = () => {
    const courses = require('../files/toy_courses.json');
    const coursesArr = Object.entries(courses);

    const [selected, setSelected] = useState([]);
    const [path, setPath] = useState([]);

    return (
        <>
            <hr></hr>
            <h3> Please select your favourite classes: </h3>
            <button className="btn btn-outline-secondary btn-sm m-1 col-4" onClick={() => findPath([], selected, courses, setPath)}>
                Calculate Path
            </button>

            {
                path.length === 0 ?
                null:
                <div>
                    <h3> Here is your courses Path </h3>
                    <div className = "col-6">
                        {path.map(course => <SimpleCourse course = {course}/>) }
                    </div>
                    <hr></hr>
                </div>
            }

            <div className="course-list">
                {coursesArr.map((course) => <SelectableCourse course={course} setSelected={setSelected}
                                                   selected={selected} />)}
            </div>
        </>
    )


}

const SelectableCourse = ({course, setSelected, selected}) => {

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

const SimpleCourse = ({course}) => {
    if (!course) {
        return null;
    }
    return (
        <div className="card m-1 p-2">
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

const findPath = (done, todo, courses, setPath) => {

    if (todo.length === 0){
        

        // Remove Duplicates;
        let seen = new Set();
        const result = done.filter(single => {
            const haveSeen = seen.has(single[0]);
            seen.add(single[0]);
            return !haveSeen;
        })
        console.log(result);
        
        // TODO: Remove Unnecessary Courses;
        // setPath(removeUnnecessaryCourses(result));

        // TODO: Not just reverse(), need a topological sorting.
        setPath(result.reverse());

        return;
    }

    let newTodo = [];
    for (let i = 0; i < todo.length; i++) {

        // TODO: Some prereqs are undefined because they are math courses which are not in the json file
        const preReqs = todo[i][1].Prereqs.map(prereq => [prereq[0], courses[prereq[0]]]);
        newTodo = [...newTodo, ...preReqs];
    }
    findPath ([...done, ...todo], newTodo, courses, setPath);
}

// TODO: 
// const removeUnnecessaryCourses = (courses) => {

// }

export default PathRecom;