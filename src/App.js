import './App.css';
import {images} from "./db/images";
import {Home,Task} from "./Pages"
import { UseTask } from './context/task-context';
import { useEffect } from 'react';

const index=Math.floor(Math.random()*images.length)
const bgImage=images[index].image;

function App() {

  // const index=Math.floor(Math.random()*images.length)
  // const bgImage=images[index].image;

  const {name, taskDispatch} =UseTask();
  useEffect(()=>{
    const userName=localStorage.getItem("name");
    taskDispatch({
      type:"NAME",
      payload:userName
    });
  },[])

  return (
    <div className="app" style={{backgroundImage:`url("${bgImage}")`}}>
      {name?<Task/>:<Home/>}
    </div>
  );
}

export default App;
