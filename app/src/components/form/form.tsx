import React from 'react';
import './form.css';

const { useState } = React;

enum TaskType {
    inProgress =  'in-progress',
    done = 'done',
    planned = 'planned'
}

interface Task {
    taskTitle: string;
    taskType: TaskType;
}

const handleaAddTask = (task: Task) => {
    
}

export default function Form() {
    const [taskList, setTaskList] = useState([])

    return (
        <div className="form-container">This is the task form</div>
    )
}
