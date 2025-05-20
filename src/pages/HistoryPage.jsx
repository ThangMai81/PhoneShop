import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import ListOrders from "./HomePage/ListOrders";
import { getCookie } from "../store/Cookie";

export default function HistoryPage() {
  const response = useLoaderData();
  return (
    <div className="flex justify-center">
      <div className="w-[1100px]">
        {/* Banner */}
        <div className="bg-slate-100 p-[20px] pl-[30px] pr-[30px] h-[150px] grid grid-cols-2 items-center mb-[30px]">
          <div className="uppercase italic font-[350] text-[30px]">
            Checkout
          </div>
          <div className="justify-self-end italic font-[500] text-sm uppercase pt-[15px]">
            Home / Cart <span className="text-slate-300">/ Checkout</span>
          </div>
        </div>
        <Suspense fallback={<p>Is loading...</p>}>
          <Await resolve={response.data}>
            {(loadedData) => (
              <ListOrders
                orders={loadedData.orders}
                userId={loadedData.userId}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

async function loadOrderHistory() {
  const authToken = getCookie("auth-token");
  console.log("Auth in history page: ", authToken);
  if (!authToken || authToken.length === 0) {
    throw json({ message: "Unauthorized!" }, { status: 401 });
  }
  const response = await fetch(
    "https://PhoneShopBackEnd.onrender.com/order/history",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response: ", response);
  if (response.status === 404) {
    const data = await response.json();
    return data;
  } else if (!response.ok) {
    throw json({ message: "Cannot fetching data..." }, { status: 500 });
  }
  const data = await response.json();
  return data;
}

export function loader() {
  return defer({
    data: loadOrderHistory(),
  });
}
