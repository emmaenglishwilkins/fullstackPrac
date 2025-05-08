import React from 'react';

const taskTracker = ({ tasks, deleteTask}) =>{
    return (
        <ul>
            {tasks.map(task => (
                <li key={task._id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-md">
                    <span className="text-lg">{task.text}</span>
                    <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                </li>
            ))}
        </ul>
    )
};

export default taskTracker;