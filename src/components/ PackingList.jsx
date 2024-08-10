import React, { useState } from "react";

const categories = [
  "Clothes",
  "Toiletries",
  "Documents",
  "Electronics",
  "Miscellaneous",
];

function PackingList({ packingList, updatePackingList }) {
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Clothes",
    packed: false,
  });

  const handleAddItem = () => {
    if (newItem.name) {
      updatePackingList([...packingList, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", category: "Clothes", packed: false });
    }
  };

  const handleTogglePacked = (id) => {
    const updatedList = packingList.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    );
    updatePackingList(updatedList);
  };

  const handleDeleteItem = (id) => {
    const updatedList = packingList.filter((item) => item.id !== id);
    updatePackingList(updatedList);
  };

  return (
    <div className="packing-list">
      <h3>Packing List</h3>
      <div className="add-item-form">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name"
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h4>{category}</h4>
          <ul>
            {packingList
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.id} className={item.packed ? "packed" : ""}>
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => handleTogglePacked(item.id)}
                  />
                  <span>{item.name}</span>
                  <button onClick={() => handleDeleteItem(item.id)}>
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PackingList;
