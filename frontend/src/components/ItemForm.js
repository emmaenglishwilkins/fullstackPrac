import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";

const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    img_url: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/clothing").then((res) => setItems(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/clothing", formData);
      const newItem = response.data;
      setItems([...items, newItem]);
      setFormData({
        name: "",
        category: "",
        price: "",
        img_url: "",
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>

        {["name", "category", "price", "img_url"].map((field) => (
          <div className="mb-4" key={field}>
            <label
              className="block text-gray-700 mb-2"
              htmlFor={field}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "price" ? "number" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required={field !== "img_url"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Item
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default ItemForm;
