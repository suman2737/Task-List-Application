import "./Task.css"
import { UseTask } from "../../context/task-context";
import { Fragment, useEffect, useState} from "react";
import {quotes} from "../../db/quotes";
import {Todo} from "../../Todo_List/Todo-List";

const index=Math.floor(Math.random()*quotes.length);
const quote=quotes[index].quote;

export const Task=()=>{

    const[isChecked, setIsChecked]=useState(false);
    const[isTodoOpen, setIsTodoOpen]=useState(false);

    const{name,time,message,task,taskDispatch}=UseTask();

    useEffect(()=>{
        const userTask=localStorage.getItem("task");
        taskDispatch({
            type:"TASK",
            payload:userTask
        });
        if (new Date().getDate() !== Number(localStorage.getItem("date"))){
            localStorage.removeItem("task");
            localStorage.removeItem("date");
            localStorage.removeItem("checkedStatus");
        }
    },[])

    useEffect(()=>{
        const checkStatus=localStorage.getItem("checkedStatus")
        checkStatus==="true"?setIsChecked(true):setIsChecked(false);
    },[])
    
    useEffect(()=>{
        getCurrentTime();
    },[time])

    const getCurrentTime=()=>{
        const today = new Date();
        const hours=today.getHours();
        const minutes=today.getMinutes();

        const hour=hours<10? `0${hours}`:hours;
        const minute=minutes<10? `0${minutes}`:minutes;

        const currentTime=`${hour}:${minute}`
        setTimeout(getCurrentTime,1000);

        taskDispatch({
            type:"TIME",
            payload:currentTime
        })

        taskDispatch({
            type:"MESSAGE",
            payload: hours
        })
    }

    const handleFromSubmit=(event)=>{
        event.preventDefault();

    }

    const handleTaskChange=(event)=>{
        if(event.key==="Enter" && event.target.value.length>0){
            taskDispatch({
                type:"TASK",
                payload:event.target.value
            });
            localStorage.setItem("task",event.target.value);
            localStorage.setItem("data", new Date().getDate());
        }
    }

    const completeTaskChange=(event)=>{

        if(event.target.checked){
            setIsChecked(isChecked=>!isChecked)
        }else{
            setIsChecked(isChecked=>!isChecked)
        }
        localStorage.setItem("checkedStatus", !isChecked)

    }

    const handleClearClick=()=>{
        taskDispatch({
            type:"CLEAR"
        })
        setIsChecked(false);
        localStorage.removeItem("task");
        localStorage.removeItem("checkedStatus");
    }

    const handleToDoClick=()=>{
        setIsTodoOpen(isTodoOpen=>!isTodoOpen);

    }
    return (
        <div className="task-container d-flex direction-column align-center ">
            <span className="time">{time}</span>
            <span className="message">{message}, {name}</span>
            {name!==null && task===null?(<Fragment>
                <span className="focus">What is your main task for today?</span>
                <form onSubmit={handleFromSubmit}>
                    <input required className="input task-input" onKeyPress={handleTaskChange}/>
                </form>
            </Fragment>):(
                <div className="user-task-container d-flex direction-column align-center gap-sm">
                <span className="heading-2">Today's Main Task</span>
                <div className="d-flex align-center gap">
                    <label className={`${isChecked? "strike-through":""} heading-3 d-flex align-center gap-sm cursor`}>
                        <input  className="check cursor" type="checkbox" onChange={completeTaskChange} checked={isChecked}/>
                        {task}
                    </label>
                    <button className="button cursor" onClick={handleClearClick}>
                        <span class="material-icons-outlined">clear</span>
                    </button>
                </div>    
            </div>
            )}
            <div className="quote-container absolute">
                <span className="quotes">{quote}</span>
            </div>
            {isTodoOpen && <Todo/>}
            <div className="todo-btn-container absolute">
                <button className="button cursor todo-btn" onClick={handleToDoClick}>ToDo</button>
            </div>
        </div>
        
    )
}