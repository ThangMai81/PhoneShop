import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductsItem from "../HomePage/ProductsItem";

function listProducts(listItems, typeClick) {
  if (typeClick === "") return listItems;
  return listItems.filter(
    (eachItem) => eachItem.category === typeClick.toLowerCase()
  );
}

export default function SearchedPhone({ listItems }) {
  const brandClick = useSelector((state) => state.categoriesReducer.brandClick);
  const typeClick = useSelector((state) => state.categoriesReducer.typeClick);
  const selectedItems = listProducts(listItems, typeClick);
  return (
    <div className="grid grid-cols-3">
      {/* because all products is belong to apple */}

      {/* if All is clicked */}
      {brandClick.isClicked
        ? listItems.map((eachItem, index) => (
            <ProductsItem
              item={eachItem}
              key={eachItem._id["$oid"]}
              index={index}
              showModal={false}
              // onClick={() => handleNavigateDetailPage(eachItem)}
            />
          ))
        : selectedItems.map((eachItem, index) => (
            <ProductsItem
              item={eachItem}
              key={eachItem._id["$oid"]}
              index={index}
              showModal={false}
              // onClick={() => handleNavigateDetailPage(eachItem)}
            />
          ))}
    </div>
  );
}
