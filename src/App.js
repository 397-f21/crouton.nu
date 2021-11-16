import React, { useState } from 'react';
import './App.css';
import {CourseList} from './components/CourseList';
import PathRecom from './components/PathRecom';
import TermSelector from './components/ToolSelector';
//import { useData } from './utilities/firebase.js';


const App = () => {
  const [tool, setTool] = useState("Course Explorer"); 

  return (
    <div className="container">
        <div>
            <img class="logo"
                    src="https://firebasestorage.googleapis.com/v0/b/cloud-walker-c72ce.appspot.com/o/logos%2FcroutonLogo.001.jpeg?alt=media&token=04edf314-5737-400d-801c-0c95f5f2fd81"
                    alt="new">      
            </img>
        </div>
      <TermSelector setTool = {setTool}/>  
      {tool === "Course Explorer" ? <CourseList /> : null}
      {tool === "Path Recommendation" ? <PathRecom /> : null}
    </div>
  );
};

export default App;