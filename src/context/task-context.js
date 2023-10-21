import { createContext, useContext, useReducer } from "react";
import { taskReducer} from "../reducer/task-reducer";


// const[name,setName]=useState("suman")
const initialData={
     name:"",
     time:"",
     message:"",
     task:null
}
const TaskContext=createContext(initialData);

const BrowserProvider=({children})=>{

    // const[name, setName]=useState("");
    // const[time,setTime]=useState("");

    const [{name,time,message,task}, taskDispatch]=useReducer(taskReducer, initialData)
    return(
        <TaskContext.Provider value={{name,time,message,task,taskDispatch}}>
             {children}
        </TaskContext.Provider>
    )
}

const UseTask=()=>useContext(TaskContext);


export{ UseTask, BrowserProvider}