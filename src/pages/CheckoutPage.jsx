import { useSelector } from "react-redux";

function CheckoutPage() {
  const listItems = useSelector((state) => state.cartReducer);
  const showListItems = listItems.map((eachItem) => (
    <div
      key={eachItem.item._id["$oid"]}
      className="grid grid-cols-2 justify-between border-b-2 py-[10px]"
    >
      <div className="italic font-semibold">{eachItem.item.name}</div>
      <div className="justify-self-end self-center italic text-sm text-slate-400">
        {Number(eachItem.item.price).toLocaleString()} VND x{" "}
        <span>{eachItem.quantity}</span>
      </div>
    </div>
  ));
  const showTotals = listItems.reduce(
    (accumulator, eachItem) =>
      accumulator + eachItem.item.price * eachItem.quantity,
    0
  );
  return (
    <div className="flex justify-center">
      <div className="w-[1000px]">
        {/* Banner */}
        <div className="bg-slate-100 p-[20px] pl-[30px] pr-[30px] h-[150px] grid grid-cols-2 items-center mb-[30px]">
          <div className="uppercase italic font-[350] text-[30px]">
            Checkout
          </div>
          <div className="justify-self-end italic font-[500] text-sm uppercase pt-[15px]">
            Home / Cart <span className="text-slate-300">/ Checkout</span>
          </div>
        </div>
        {/* Main part */}
        <div className="grid grid-cols-5 gap-[40px]">
          {/* Form for personal info */}
          <div className="col-span-3 flex flex-col italic">
            <h1 className="uppercase font-semibold mb-[20px] text-xl">
              Billing details
            </h1>
            <form className="flex flex-col">
              <span className="uppercase italic mb-[5px]">Full Name:</span>
              <input
                type="text"
                placeholder="Enter Your Full Name Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
              />
              <span className="uppercase italic mb-[5px]">Email:</span>
              <input
                type="text"
                placeholder="Enter Your Email Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
              />
              <span className="uppercase italic mb-[5px]">Phone Number:</span>
              <input
                type="text"
                placeholder="Enter Your Phone Number Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
              />
              <span className="uppercase italic mb-[5px]">Address:</span>
              <input
                type="text"
                placeholder="Enter Your Address Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
              />
              <button
                type="button"
                className="italic py-[5px] px-[30px] self-start text-slate-100 bg-neutral-800 font-[300]"
              >
                Place order
              </button>
            </form>
          </div>
          {/* Lastest orders */}
          <div className="col-span-2 bg-slate-100 p-[40px] grid grid-flow-row">
            <h1 className="uppercase text-xl italic font-semibold mb-[20px]">
              Your order
            </h1>
            <div>{showListItems}</div>
            <div className="grid grid-cols-2 justify-between mt-[10px]">
              <span className="uppercase font-semibold italic">Total</span>
              <span className="justify-self-end italic text-xl font-[350]">
                {Number(showTotals).toLocaleString()} VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;
