import React from 'react';
import './App.css';
import {CourseList} from './components/CourseList';
//import { useData } from './utilities/firebase.js';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  //const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  return (
    <div className="container">
      <CourseList />
    </div>
  );
};

export default App;