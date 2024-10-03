import { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../store/ReduxStore";
import { IoTrashBinOutline } from "react-icons/io5";
import { HiArrowLongRight, HiGiftTop } from "react-icons/hi2";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
function CartPage() {
  // To navigate if click "Proceed to checkout" or "Continue shopping"
  const navigate = useNavigate();
  const listItems = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  function handleDecreaseQuantity(eachItem) {
    console.log(eachItem);
    const data = {
      item: eachItem.item,
      state: "decrease",
    };
    dispatch(cartSlice.actions.UPDATE_CART(data));
  }
  function handleIncreaseQuantity(eachItem) {
    const data = {
      item: eachItem.item,
      state: "increase",
    };
    dispatch(cartSlice.actions.UPDATE_CART(data));
  }
  function handleDeleteItem(item) {
    const check = window.confirm("Are you sure you want to delete this item?");
    if (check) {
      dispatch(cartSlice.actions.DELETE_CART(item));
    }
  }
  const showListItems = listItems.map((eachItem) => (
    <div
      key={eachItem.item._id["$oid"]}
      className="grid grid-cols-6 justify-items-center items-center px-[20px] py-[10px]"
    >
      <img src={eachItem.item.img1} className="px-[5px]" />
      <span className="italic font-semibold text-center px-[5px]">
        {eachItem.item.name}
      </span>
      <span className="italic text-slate-400 text-center">
        {Number(eachItem.item.price).toLocaleString()} VND
      </span>
      <p className="text-slate-400 flex justify-between w-[60px] justify-self-center">
        <span className="text-black">
          <MdArrowLeft
            className="inline cursor-pointer mr-[5px]"
            onClick={() => handleDecreaseQuantity(eachItem)}
          />
          <span>{eachItem.quantity}</span>
          <MdArrowRight
            className="inline cursor-pointer ml-[5px]"
            onClick={() => handleIncreaseQuantity(eachItem)}
          />
        </span>
      </p>
      <span className="italic text-slate-400 text-center">
        {Number(eachItem.item.price * eachItem.quantity).toLocaleString()} VND
      </span>
      <span
        className="cursor-pointer"
        onClick={() => handleDeleteItem(eachItem.item)}
      >
        <IoTrashBinOutline />
      </span>
    </div>
  ));
  let total = 0;
  if (listItems.length > 0) {
    total = listItems.reduce(
      (accumulator, eachItem) =>
        accumulator + eachItem.item.price * eachItem.quantity,
      0
    );
    console.log(total);
  }
  function handleNavigateAfterCheckItems(type) {
    if (type === "shop") {
      navigate("/shop");
    } else {
      navigate("/checkout");
    }
  }
  return (
    <div className="flex justify-center">
      <div className="w-[1000px]">
        {/* Banner */}
        <div className="bg-slate-100 p-[20px] pl-[30px] pr-[30px] h-[150px] grid grid-cols-2 items-center ">
          <div className="uppercase italic font-[350] text-[30px]">Cart</div>
          <div className="justify-self-end italic font-[500] text-sm uppercase text-slate-400 pt-[15px]">
            cart
          </div>
        </div>
        {/* List of products */}

        <h1 className="uppercase font-semibold italic mt-[30px] mb-[30px]">
          Shopping cart
        </h1>
        <div className="grid grid-cols-5">
          <div className="col-span-3 grid grid-flow-row">
            {/* List headers*/}
            <div className="uppercase italic font-semibold px-[20px] py-[10px] bg-slate-100 grid grid-cols-6 justify-items-center">
              <h1>Image</h1>
              <h1>Product</h1>
              <h1>Price</h1>
              <h1>Quantity</h1>
              <h1>Total</h1>
              <h1>Remove</h1>
            </div>
            {showListItems}
            {/* Continue shopping or proceed to checkout */}
            <div className="bg-slate-100 p-[10px] h-[50px] text-sm flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <HiArrowLongLeft className="inline mr-[2px] mt-[2px]" />
                <button
                  type="button"
                  className="italic"
                  onClick={() => handleNavigateAfterCheckItems("shop")}
                >
                  Continue shopping
                </button>
              </div>
              <div className="flex flex-row items-center border-2 border-black mr-[20px] p-[10px] py-[5px]">
                <button
                  type="button"
                  className="italic"
                  onClick={() => handleNavigateAfterCheckItems("checkout")}
                >
                  Proceed to checkout
                </button>
                <HiArrowLongRight className="inline ml-[5px] mt-[2px]" />
              </div>
            </div>
          </div>
          {/* Total (bill) */}
          <div className="col-span-2 bg-slate-100 ml-[30px] p-[40px] h-[300px]">
            <h1 className="italic font-semibold uppercase text-xl mb-[20px]">
              Cart total
            </h1>
            <div className="flex flex-row justify-between border-b-[2px] pb-[10px]">
              <span className="italic font-semibold uppercase">Subtotal</span>
              <span className="italic text-slate-400">
                {Number(total).toLocaleString()} VND
              </span>
            </div>
            <div className="flex flex-row justify-between pt-[10px]">
              <span className="italic font-semibold uppercase">Total</span>
              <span className="italic text-xl font-[350]">
                {Number(total).toLocaleString()} VND
              </span>
            </div>
            <form className="grid grid-rows-2 gap-y-0">
              <input
                type="text"
                placeholder="Enter your coupon"
                className="p-[5px] mt-[40px] border-2"
              />
              <button
                type="button"
                className="bg-neutral-800 h-[30px] text-white "
              >
                <HiGiftTop className="inline mr-[5px]" />
                <span>Apply coupon</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartPage;
