import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post("/tasks", { text }).then(res => {
      setTasks([...tasks, { _id: res.data._id, text }]);
      setText("");
    });
  };

  const deleteTask = id => {
    axios.delete(`/tasks/${id}`).then(() => {
      setTasks(tasks.filter(t => t._id !== id));
    });
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
