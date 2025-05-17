import { Await, defer, json, useLoaderData } from "react-router-dom";
import OrderDetail from "./HomePage/OrderDetail";
import { Suspense } from "react";

export default function OrderDetailPage() {
  const response = useLoaderData();
  return (
    <div className="flex justify-center">
      <div className="w-[1100px]">
        {/* Banner */}
        <div className="bg-slate-100 p-[20px] pl-[30px] pr-[30px] h-[150px] grid grid-cols-2 items-center mb-[30px]">
          <div className="uppercase italic font-[350] text-[30px]">
            Information Order
          </div>
        </div>
        <Suspense fallback={<p>Is loading...</p>}>
          <Await resolve={response.data}>
            {(loadedData) => (
              <>
                <div className="italic font-[100]">
                  ID User: {loadedData.userId}
                </div>
                <div className="italic font-[100]">
                  Full Name: {loadedData.order.name}
                </div>
                <div className="italic font-[100]">
                  Phone: {loadedData.order.phone}
                </div>
                <div className="italic font-[100]">
                  Address: {loadedData.order.address}
                </div>
                <div className="italic font-[100] mb-[50px]">
                  Total:{" "}
                  {loadedData.order.cart
                    .reduce((sum, eachCart) => {
                      return (
                        sum + Number(eachCart.product.price) * eachCart.count
                      );
                    }, 0)
                    .toLocaleString("vi-VN")}{" "}
                  VND
                </div>
                <OrderDetail order={loadedData.order} />
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

async function loadOrderById(params) {
  console.log("Touch ? ");
  const { orderId } = params;
  const authToken = localStorage.getItem("auth-token") || {};
  console.log("Auth in history page: ", authToken);
  if (Object.keys(authToken).length === 0) {
    throw json({ message: "Unauthorized!" }, { status: 401 });
  }
  const response = await fetch(
    `https://PhoneShopBackEnd.onrender.com/order/history/${orderId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response: ", response);
  if (!response.ok) {
    throw json({ message: "Cannot fetching data..." }, { status: 500 });
  }
  const data = await response.json();
  return data;
}

export function loader({ params }) {
  return defer({
    data: loadOrderById(params),
  });
}
