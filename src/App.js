import React, { useState } from 'react';
import './App.css';
import {CourseList} from './components/CourseList';
import TermSelector from './components/ToolSelector';
//import { useData } from './utilities/firebase.js';


const App = () => {
  const [tool, setTool] = useState("Course Explorer"); 

  return (
    <div className="container">
      <TermSelector setTool = {setTool}/>  
      {tool === "Course Explorer" ? <CourseList /> : null}
    </div>
  );
};

export default App;