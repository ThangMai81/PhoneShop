import { useState } from "react";
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const listItems = useSelector((state) => state.cartReducer);
  const authToken = localStorage.getItem("auth-token") || {};
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showListItems = listItems.map((eachItem) => (
    <div
      key={eachItem.item._id}
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

  const validateForm = () => {
    if (!fullName.trim()) {
      window.alert("Please fill in full name");
      return false;
    }

    if (!email.trim()) {
      window.alert("Please fill in email");
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      window.alert("Email is not valid");
      return false;
    }

    if (!phoneNumber.trim()) {
      window.alert("Please fill in phone number");
      return false;
    }

    if (!address.trim()) {
      window.alert("Please fill in address");
      return false;
    }

    return true;
  };

  async function handleOrder() {
    if (!validateForm()) {
      return;
    }
    if (Object.keys(authToken).length === 0) {
      window.alert("Please sign in first!");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: fullName,
          phone: phoneNumber,
          address: address,
          products: listItems,
        }),
      });

      if (response.status === 401) {
        throw json({ message: "Unauthorized" }, { status: 401 });
      }
      if (response.status === 500 || response.status === 404) {
        throw json({ message: "Internal Server Error" }, { status: 500 });
      }
      if (response.status === 200) {
        window.alert("Order successfully!");
        navigate("/transaction");
        return;
      }
    } catch (err) {
      throw json({ message: "Something wrong..." }, { status: 500 });
    } finally {
      setIsSubmitting(false);
    }
  }
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
                onChange={(e) => setFullName(e.target.value)}
              />
              <span className="uppercase italic mb-[5px]">Email:</span>
              <input
                type="text"
                placeholder="Enter Your Email Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="uppercase italic mb-[5px]">Phone Number:</span>
              <input
                type="text"
                placeholder="Enter Your Phone Number Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <span className="uppercase italic mb-[5px]">Address:</span>
              <input
                type="text"
                placeholder="Enter Your Address Here!"
                className="border-2 px-[10px] py-[5px] mb-[15px]"
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="button"
                className={`italic py-[5px] px-[30px] self-start text-slate-100 bg-neutral-800 font-[300] mb-[20px] ${
                  isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-neutral-800"
                }`}
                onClick={handleOrder}
              >
                {isSubmitting ? "Processing..." : "Place order"}
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
