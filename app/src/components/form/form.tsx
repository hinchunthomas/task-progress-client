import React from 'react';
import './form.css';
import Report from '../report/report'

const { useState, useEffect, useRef } = React;

interface Task {
    taskCode: string;
    taskLink: string;
    taskTitle: string;
    taskStatus: string;
}

// TO-LEARN: Initial props to the component (Can be variable / function)
// For function, we cannot call it directly
// Just can be called under a parent function
// Like event emitter
export default function Form() {

    // TO-LEARN: Initial state
    const [taskList, setTaskList] = useState<Array<Task>>([])
    const [errorMessage, setErrorMessage] = useState<string>('')

    // TO-LEARN: set reference to the HTML element
    const taskLinkRef = useRef<HTMLInputElement>(null)

    const taskTitle = useRef<HTMLInputElement>(null)

    const taskStatusRef = useRef<HTMLSelectElement>(null)

    const taskStatusList = [
        {
            name: 'To Do',
            id: 'to-do'
        },
        {
            name: 'In Progress',
            id: 'in-progress'
        },
        {
            name: 'Done',
            id: 'done'
        }
    ]

    // TO-LEARN: Effect before rendering
    useEffect(() => {
        // Take the task list saved in cookies
        const storedTaskList = JSON.parse(localStorage.getItem('LOCAL_STORAGE_KEY') ?? '{}')
        setTaskList(storedTaskList)
    }, [])

    // TO-LEARN: Side effect after the action
    // add the states / props inside the [] will be seen as dependency(ies)
    // If there is any change on the dependency(ies)
    // the effect will be triggered
    useEffect(() => {
        localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(taskList))
    }, [taskList])

    // TO-LEARN: Take the value from the reference
    // and set action + reducer
    function handleAddTask() {
        const link = taskLinkRef.current?.value ?? ''
        const status = taskStatusRef.current?.value ?? ''
        const title = taskTitle.current?.value ?? ''
        if (link === '' || status === '' || title === '') {
            setErrorMessage('Please fill in all information')
            console.error('error: Please fill in all information')
            return
        }
        const lastSlashIndex = link.lastIndexOf('/');
        const code = link.substring(lastSlashIndex+1);
        if( lastSlashIndex === -1 || !code.match("\\w+") ){
            /* file has no extension */
            setErrorMessage('Task Hyperlink is not correct')
            console.error('error: Link is not correct')
            return
        }
        
        setTaskList([...taskList, { taskCode: code, taskLink: link, taskTitle: title, taskStatus: status } ])
    }

    function clearAllTask() {
        setTaskList([])
    }
    

    // TO-LEARN: the render function must inside one set of <div></div>
    // and we can use {} to retrieve the function / variable for rendering
    return (
        <>
            <div className="form-overall-container">
                <form className="form-container">
                    {/* TO-LEARN: Rendering the HTML tag with for loop * /}
                    {/* Only if the list's length is larger than 0 */}
                    <div className="input-container">
                        <input
                            ref={taskLinkRef}
                            type="text"
                            placeholder="Task Hyperlink"
                            id="task-link"
                        ></input>
                    </div>
                    <div className="input-container">
                        <input
                            ref={taskTitle}
                            type="text"
                            placeholder="Task Name"
                            id="task-link"
                        ></input>
                    </div>
                    <div className="input-container">
                        <select
                            ref={taskStatusRef}
                            placeholder="Please Enter the status of the task"
                            id="task-status"
                        >
                            {taskStatusList.map(status => {
                                return (
                                    <>
                                        <option
                                            key={status.id}
                                            value={status.id}
                                        >
                                            {status.name}
                                        </option>
                                    </>
                                )
                            })}
                        </select>
                    </div>
                    <div className="error-message-container">
                        { errorMessage !== '' ? 'Error: ' + errorMessage : ''}
                    </div>
                    <div className="buttons-container">
                        <button
                            className="submit-button"
                            type="button"
                            onClick={() => {
                                handleAddTask()
                            }}
                        >
                            Add Task
                        </button>
                        <button
                            className="submit-button"
                            type="button"
                            onClick={() => {
                                clearAllTask()
                            }}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <Report taskList={taskList} />
        </>
    );
}
