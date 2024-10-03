import { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import ProductsItem from "../HomePage/ProductsItem";
import { useDispatch } from "react-redux";
import { addToCartButtonSlice, cartSlice } from "../../store/ReduxStore";
import { useNavigate } from "react-router-dom";
function addBrToText(text) {
  let result = <></>;
  let arrSplitByBr = text.split("\n\n");
  result = arrSplitByBr.map((eachText) => (
    <span className="block" key={eachText}>
      {eachText}
    </span>
  ));
  return result;
}
// Main component
export default function Detail({ listItems, productId }) {
  const navigate = useNavigate();
  const item = listItems.filter(
    (eachItem) => eachItem._id["$oid"] === productId
  )[0];
  const sameCategoryItems = listItems.filter(
    (eachItem) => eachItem.category === item.category
  );
  // These following codes are to handle quantity update and addtocart
  const [numOfItem, setNumOfItem] = useState(1);
  const dispatch = useDispatch();
  function handleDecreaseQuantity() {
    if (numOfItem > 0) {
      setNumOfItem((prevNum) => {
        return (prevNum -= 1);
      });
    }
  }
  function handleIncreaseQuantity() {
    setNumOfItem((prevNum) => {
      return (prevNum += 1);
    });
  }
  function handleAddToCart() {
    const getUser = JSON.parse(localStorage.getItem("user-login")) || [];
    console.log(getUser);
    // if user has not logged in and want to buy product, he would have to log in first
    if (typeof getUser === "object" && Object.keys(getUser).length === 0) {
      window.alert("You haven't logged in yet!");
      navigate("/login");
      // have logged in already
    } else {
      navigate("/cart");
    }
    // mark that the add to cart has been clicked
    const itemForCart = {
      item: item,
      quantity: numOfItem,
    };
    dispatch(cartSlice.actions.ADD_CART(itemForCart));
    dispatch(addToCartButtonSlice.actions.haveClicked());
  }
  return (
    <div className="flex justify-center">
      <div className="w-[900px]">
        {/* Detail of product part */}
        <div className="grid grid-cols-2 gap-[20px]">
          <div className="grid grid-rows-5 grid-flow-col gap-[5px]">
            <img src={item.img2} />
            <img src={item.img3} />
            <img src={item.img4} />
            <img src={item.img1} />
            <img src={item.img1} className="col-span-4 row-span-4" />
          </div>
          <div>
            <p className="font-semibold text-2xl italic mb-[10px]">
              {item.name}
            </p>
            <h1 className="text-slate-200 italic mb-[10px]">
              {`${Number(item.price).toLocaleString()} VND`}
            </h1>
            <p className="mb-[10px]">{addBrToText(item.short_desc)}</p>
            <div className="mb-[10px]">
              <span className="font-[500] italic text-sm">CATEGORY:</span>
              <span className="italic text-slate-300"> {item.category}</span>
            </div>
            <div className="mb-[10px] grid grid-cols-4">
              <p className="text-slate-400 border-2 px-[20px] py-[5px] flex justify-between col-span-2">
                <span className="italic">QUANTITY</span>
                <span className="text-black">
                  <MdArrowLeft
                    className="inline cursor-pointer"
                    onClick={handleDecreaseQuantity}
                  />
                  <span>{numOfItem}</span>
                  <MdArrowRight
                    className="inline"
                    onClick={handleIncreaseQuantity}
                  />
                </span>
              </p>
              <button
                type="button"
                className="bg-neutral-800 p-[10px] text-white italic font-[150] w-[120px] col-span-1"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* Description part */}
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex flex-col">
            <button className="text-white italic uppercase bg-neutral-800 p-[10px] text-sm w-[120px] mb-[10px]">
              Description
            </button>
            <div>
              <h1 className="uppercase font-[500] italic mb-[30px]">
                Product Description
              </h1>

              <p className="text-slate-300 italic mb-[80px]">
                {addBrToText(item.long_desc)}
              </p>
            </div>
          </div>
        </div>
        {/* Related products */}
        <h1 className="font-semibold uppercase mb-[20px]">Related Products</h1>
        <div className="grid grid-cols-4 grid-flow-row">
          {sameCategoryItems.map((eachItem) => (
            <ProductsItem
              item={eachItem}
              index={1}
              showModal={false}
              key={eachItem._id["$oid"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
