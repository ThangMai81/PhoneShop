import { useState } from "react";
import SearchedPhone from "./SearchedPhone";

export default function ShowSearchedPhone({ listItems }) {
  const [listSearchedItems, setListSearchedItems] = useState(listItems);
  function handleSearch(event) {
    const searchInput = event.target.value.toLowerCase();
    const searchedItems = listItems.filter((eachItem) => 
      eachItem.name.toLowerCase().includes(searchInput) || 
      Number(eachItem.price).toLocaleString("vi-VN").includes(searchInput));
    setListSearchedItems(searchedItems);
  }
  return (
    <div className="flex flex-col content-center">
      {/* For searching option and search input */}
      <div className="flex justify-between pl-[10px] ">
        {/* Input search iphone */}
        <div className="mb-[40px] mt-[35px] w-[200px]">
          <input
            type="text"
            placeholder="Enter Search Here!"
            className="text-slate-400 p-[5px] border-2 border-slate-200"
            onChange={(event) => handleSearch(event)}
          />
        </div>
      </div>
      {/* Show searched phone */}
      <SearchedPhone listItems={listSearchedItems} />
    </div>
  );
}
