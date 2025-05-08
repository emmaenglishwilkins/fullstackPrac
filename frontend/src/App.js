import React, { useState, useEffect } from "react";
import axios from "axios";

import ItemCard from "./components/ItemCard";
import ItemForm from "./components/ItemForm";
import TaskForm from "./components/TaskForm";
import TaskTracker from "./components/TaskTracker";

function App() {
  const [items, setItems] = useState([]);

  // Fetch clothing items
  useEffect(() => {
    axios.get("/clothing")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching clothing items:", err));
  }, []);

  const addItem = (item) => {
    axios.post("/clothing", item)
      .then(res => setItems(prev => [...prev, res.data]))
      .catch(err => console.error("Error adding item:", err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center my-8">Item Tracker</h1>
      <ItemForm onAdd={addItem} />
      <div className="grid grid-cols-3 gap-4 my-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      <h1 className="text-4xl font-bold text-center my-8">Task Tracker</h1>
      <TaskForm />
      <TaskTracker />
    </div>
  );
}

export default App;
