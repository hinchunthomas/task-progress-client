import React from 'react';
import './form.css';

const { useState, useEffect, useRef } = React;

enum TaskStatus {
    inProgress =  'in-progress',
    done = 'done',
    planned = 'planned'
}

interface Task {
    taskTitle: string;
    taskStatus: TaskStatus;
}

// TO-LEARN: Initial props to the component (Can be variable / function)
// For function, we cannot call it directly
// Just can be called under a parent function
// Like event emitter
export default function Form(props: { checkTaskList: any }) {

    // TO-LEARN: Initial state
    const [taskList, setTaskList] = useState<Array<Task>>([])

    // TO-LEARN: set reference to the HTML element
    const taskLinkRef = useRef<HTMLInputElement>(null)

    const taskStatusRef = useRef<HTMLInputElement>(null)

    // TO-LEARN: Effect before rendering
    useEffect(() => {
        // Take the task list saved in cookies
        const storedTaskLis = JSON.parse(localStorage.getItem('LOCAL_STORAGE_KEY') ?? '{}')
        setTaskList(storedTaskLis)
    }, [])

    // TO-LEARN: Side effect after the action
    useEffect(() => {
        localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(taskList))
    }, [taskList])

    function handleCheckTaskList(tasksJSON: string) {
        // checkTaskList(tasksJSON)
    }

    function readTask(taskObject: Object) {
        console.log({taskObject})
    }

    // TO-LEARN: Take the value from the reference
    // and set action + reducer
    function handleAddTask() {
        const link = taskLinkRef.current?.value ?? ''
        setTaskList(prevTaskList => {
            return [...prevTaskList, { taskTitle: link , taskStatus: TaskStatus.inProgress} ]
        })
        console.log({ link })
    }
    

    // TO-LEARN: the render function must inside one set of <div></div>
    // and we can use {} to retrieve the function / variable for rendering
    return (
        <div className="form-container">
            This is the task form
            <form>
                {/* TO-LEARN: Rendering the HTML tag with for loop * /}
                {/* Only if the list's length is larger than 0 */}
                {
                    taskList.length > 0 && taskList.map((task: Task, index: number) => {
                        return (
                            <div>
                                {`Task ${index}: ${task.taskTitle}`} <br /><br />
                                {`Task Ptogress: ${task.taskStatus}`}
                            </div>
                        );
                    })
                }
                <input
                    ref={taskLinkRef}
                    type="text"
                    placeholder="Please Enter the link of the task"
                    id="task-link"
                >
                <input
                    ref={taskStatusRef}
                    type="text"
                    placeholder="Please Enter the status of the task"
                    id="task-status"
                ></input>
                </input>
                <button onClick={() => {
                    handleAddTask()
                }}>
                    Add Task
                </button>
            </form>
            <button
                onClick={() => {
                    handleCheckTaskList(JSON.stringify(taskList));
                }}
            >
            </button>
        </div>
    );
}
