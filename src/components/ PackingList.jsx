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
    <div>
      <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-5">Packing List</h3>
      <div className="add-item-form flex flex-col space-y-4">
        <input
          className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name"
        />
        <select
          className="rounded-lg p-1 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddItem}
          className="w-full mt-4 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px] lg:text-[36px]"
        >
          Add Item
        </button>
      </div>
      <hr className="border-2 my-4 border-[#FBFBEF]"></hr>
      {categories.map((category) => (
        <div key={category}>
          <h4 className="font-bold">{category}</h4>
          <hr className="w-[50%] border-2 border-[#FBFBEF]" />
          <ul className="mb-3">
            {packingList
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.id} className={`flex justify-between items-center ${item.packed ? "text-[#151E41]" : ""}`}>
                  <div className={`${item.packed ? "line-through" : ""}`}>
                    <input
                      type="checkbox"
                      checked={item.packed}
                      onChange={() => handleTogglePacked(item.id)}
                      className="w-5 h-5 mr-3"
                    />
                    <span>{item.name}</span>
                  </div>
                  <button onClick={() => handleDeleteItem(item.id)} className="font-bold hover:text-red-600">
                    X
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
