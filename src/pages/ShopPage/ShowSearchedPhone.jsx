import SearchedPhone from "./SearchedPhone";

export default function ShowSearchedPhone({ listItems }) {
  return (
    <div className="flex flex-col content-center">
      {/* For searching option and search input */}
      <div className="flex justify-between pl-[10px]">
        {/* Input search iphone */}
        <div className="mb-[40px] mt-[10px]">
          <input
            type="text"
            placeholder="Enter Search Here!"
            className="text-slate-200 p-[5px] border-2 border-slate-200"
          />
        </div>
        {/* Select type of sorting */}
        <select name="type-sort" className="w-[150px] h-[25px] mt-[20px]">
          <option value="default-sorting">Default sorting</option>
        </select>
      </div>
      {/* Show searched phone */}
      <SearchedPhone listItems={listItems} />
    </div>
  );
}
