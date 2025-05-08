import React from 'react';

const ItemCard = ({ item }) =>{
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300">
      <img
        className="w-full h-64 object-cover"
        src={item.img_url}
        alt={item.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-500 text-sm mb-2">{item.category}</p>
        <p className="text-lg font-bold text-indigo-600">${item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
