import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesClickSlice } from "../../store/ReduxStore";

export default function CategoriesShop() {
  const dispatch = useDispatch();
  const brandClick = useSelector((state) => state.categoriesReducer.brandClick);
  const typeClick = useSelector((state) => state.categoriesReducer.typeClick);
  // Classes for className
  const choosingBrandProducts =
    "uppercase text-sm text-slate-500 italic p-[10px] hover:bg-black hover:text-white hover:cursor-pointer hover:duration-700 ease-in-out";
  const categoryClass = "uppercase italic bg-slate-200 p-[10px] text-sm";
  const choosingClass =
    "text-xs text-slate-500 italic hover:text-orange-200 p-[10px]";
  const categoryDiv = "flex flex-col p-[5px]";
  function handleChooseBrand(brandEl) {
    dispatch(categoriesClickSlice.actions.getBrandClick(brandEl.innerHTML));
  }
  function handleChooseType(typeEl) {
    dispatch(categoriesClickSlice.actions.getTypeClick(typeEl.innerHTML));
  }
  return (
    <div className="flex flex-col">
      <h1 className="uppercase italic text-xl">Categories</h1>
      {/* Choose apple category or all products */}
      <div className={categoryDiv}>
        <h1
          className={`${choosingBrandProducts} ${
            // choose apple as default
            brandClick.name === "" || brandClick.name === "Apple"
              ? "bg-black text-white"
              : ""
          }`}
          onClick={(event) => handleChooseBrand(event.target)}
        >
          Apple
        </h1>
        <h1
          className={`${choosingBrandProducts} ${
            brandClick.name === "All" ? "bg-black text-white" : ""
          }`}
          onClick={(event) => handleChooseBrand(event.target)}
        >
          All
        </h1>
      </div>
      {/* Iphone or Mac choosing */}
      <div className={categoryDiv}>
        <h1 className={categoryClass}>IPhone & Mac</h1>
        <span
          className={`${choosingClass} ${
            typeClick === "IPhone" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          IPhone
        </span>
        <span
          className={`${choosingClass} ${
            typeClick === "Ipad" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Ipad
        </span>
        <span
          className={`${choosingClass} ${
            typeClick === "Macbook" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Macbook
        </span>
      </div>
      <div className={categoryDiv}>
        <h1 className={categoryClass}>Wireless</h1>
        <span
          className={`${choosingClass} ${
            typeClick === "Airpod" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Airpod
        </span>
        <span
          className={`${choosingClass} ${
            typeClick === "Watch" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Watch
        </span>
      </div>
      <div className={categoryDiv}>
        <h1 className={categoryClass}>Other</h1>
        <span
          className={`${choosingClass} ${
            typeClick === "Mouse" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Mouse
        </span>
        <span
          className={`${choosingClass} ${
            typeClick === "Keyboard" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Keyboard
        </span>
        <span
          className={`${choosingClass} ${
            typeClick === "Other" && brandClick.isClicked === false
              ? "text-orange-200"
              : ""
          }`}
          onClick={(event) => handleChooseType(event.target)}
        >
          Other
        </span>
      </div>
    </div>
  );
}
