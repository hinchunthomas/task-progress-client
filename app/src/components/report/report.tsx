import React from 'react';
import './report.css'

interface Task {
    taskCode: string;
    taskLink: string;
    taskTitle: string;
    taskStatus: string;
}


export default function Report (props: { taskList: Array<Task> }) {
    return (
        <>
            <h3>Report Template</h3>
            <div className="report-container">
                {
                    props.taskList.length > 0 &&
                    <div className="report-task-container">
                        <span>
                            Hi Team,
                        </span>
                        <span>
                            Here is my update on my task progress.
                        </span>
                        <br />
                    </div>
                }
                {
                    props.taskList.filter(task => task.taskStatus === 'to-do').length > 0 && props.taskList.filter(task => task.taskStatus === 'to-do').map((task, index) => {
                        return(
                            <div className="report-task-container">
                                <span className="report-task-status-header"><b>To Do:</b></span>
                                <span key={index}>
                                    <a target="_blank" href={task.taskLink} rel="noreferrer">{task.taskCode}</a>&nbsp; - &nbsp;{task.taskTitle}
                                </span>
                            </div>
                        )
                    })
                }
                {
                    props.taskList.filter(task => task.taskStatus === 'in-progress').length > 0 && props.taskList.filter(task => task.taskStatus === 'in-progress').map((task, index) => {
                        return(
                            <div className="report-task-container">
                                <span className="report-task-status-header"><b>In Progress:</b></span> 
                                <span key={index}>
                                    <a target="_blank" href={task.taskLink} rel="noreferrer">{task.taskCode}</a>&nbsp; - &nbsp;{task.taskTitle}
                                </span>
                            </div>
                        )
                    })
                }
                {
                    props.taskList.filter(task => task.taskStatus === 'done').length > 0 && props.taskList.filter(task => task.taskStatus === 'done').map((task, index) => {
                        return(
                            <div className="report-task-container">
                                <span className="report-task-status-header"><b>Done:</b></span>
                                <span key={index}>
                                    <a target="_blank" href={task.taskLink} rel="noreferrer">{task.taskCode}</a>&nbsp; - &nbsp;{task.taskTitle}
                                </span>
                            </div>
                        )
                    })
                }
                {
                    props.taskList.length > 0 &&
                    <div className="report-task-container">
                        <br />
                        <span>
                            Thanks.
                        </span>
                    </div>
                }
            </div>
        </>
    )
}