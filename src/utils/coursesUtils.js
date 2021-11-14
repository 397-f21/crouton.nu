

export const getStartingCourses = (courses) => {

    if (!courses){
        return;
    }
    return courses.filter((course) => course[1].Prereqs.length === 0);

};

 