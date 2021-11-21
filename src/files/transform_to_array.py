import json
 
f = open('toy_courses.json')
 
data = json.load(f)
 
allCoursesArr = []
for key in data:
    newObj = data[key]
    newObj["course_number"] = key
    allCoursesArr.append(newObj)

with open('coursesArr.json', 'w') as cA:
    json.dump(allCoursesArr, cA, indent=4)

