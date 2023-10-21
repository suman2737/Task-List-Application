import { UseTask } from "../../context/task-context"
import "./Home.css"

export const Home=()=>{
    const {name, taskDispatch}=UseTask();

    const handleFormOnSubmit=(event)=>{
         event.preventDefault();
    }

    const handleName=(event)=>{
        if(event.key==="Enter" && event.target.value.length>0){
            taskDispatch({
                type:"NAME",
                payload: event.target.value
            })
            localStorage.setItem("name",event.target.value);
        }
    }
    return(
        <div className="home-container d-flex direction-column align-center gap-lg">
        <h1 className=" main-heading">Task List Application</h1>
        <div className="d-flex direction-column gap">
            <span className="heading-1 question">Hello, what's your name?</span>
            <form onSubmit={handleFormOnSubmit}>
                <input required className="input" onKeyPress={handleName}/>
            </form>
        </div>
        </div>
    )
}