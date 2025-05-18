import { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import ProductsItem from "../HomePage/ProductsItem";
import { useDispatch } from "react-redux";
import { addToCartButtonSlice, cartSlice } from "../../store/ReduxStore";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../store/Cookie";
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
export default function Detail({ Item, RelatedProducts }) {
  console.log("Detail page: ", Item, RelatedProducts);
  const navigate = useNavigate();
  const item = Item;
  const sameCategoryItems = RelatedProducts;
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
  async function handleAddToCart() {
    try {
      const authToken = getCookie("auth-token");
      console.log(authToken);
      // if user has not logged in and want to buy product, he would have to log in first
      if (!authToken || authToken.length === 0) {
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
    } catch (err) {
      if (!err.statusCode) {
        throw new Error({ status: 400, message: "Something wrong when login" });
      }
    }
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
            <h1 className="text-slate-400 italic mb-[10px]">
              {`${Number(item.price).toLocaleString()} VND`}
            </h1>
            <p className="mb-[10px]">{addBrToText(item.short_desc)}</p>
            <div className="mb-[10px]">
              <span className="font-[500] italic text-sm">CATEGORY:</span>
              <span className="italic text-slate-400 uppercase">
                {" "}
                {item.category}
              </span>
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
                    className="inline cursor-pointer"
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
            <button className="text-white italic uppercase bg-neutral-800 p-[10px] text-sm w-[120px] mb-[20px]">
              Description
            </button>
            <div>
              <h1 className="uppercase font-[500] italic mb-[20px]">
                Product Description
              </h1>
              <p className="text-slate-500 italic mb-[20px]">
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
              key={eachItem._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
