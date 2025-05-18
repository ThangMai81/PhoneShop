import { useNavigate } from "react-router-dom";

export default function ListOrders({ orders, userId }) {
  const navigate = useNavigate();
  function handleOrder(eachOrder) {
    navigate(`/transaction/${eachOrder._id}`);
  }
  return (
    <div className="overflow-x-auto">
      <div className="max-w-[1100px] mx-auto">
        <table className="min-w-full table-auto border-collapse text-center">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
            <tr>
              <th className="px-4 py-2">ID ORDER</th>
              <th className="px-4 py-2">ID USER</th>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">PHONE</th>
              <th className="px-4 py-2">ADDRESS</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">DELIVERY</th>
              <th className="px-4 py-2">STATUS</th>
              <th className="px-4 py-2">DETAIL</th>
            </tr>
          </thead>
          {orders.length > 0 ? (
            <tbody className="text-sm text-gray-800">
              {orders.map((eachOrder) => {
                const total = eachOrder.cart.reduce(
                  (sum, item) => sum + Number(item.product.price) * item.count,
                  0
                );
                return (
                  <tr key={eachOrder._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{eachOrder._id}</td>
                    <td className="px-4 py-2">{userId}</td>
                    <td className="px-4 py-2">{eachOrder.name}</td>
                    <td className="px-4 py-2">{eachOrder.phone}</td>
                    <td className="px-4 py-2">{eachOrder.address}</td>
                    <td className="px-4 py-2">
                      {total.toLocaleString("vi-VN")} VND
                    </td>
                    <td className="px-4 py-2">Waiting for progressing</td>
                    <td className="px-4 py-2">Waiting for pay</td>
                    <td className="px-4 py-2">
                      <button
                        className="border px-3 py-1 rounded hover:bg-black hover:text-white transition duration-200"
                        onClick={() => {
                          handleOrder(eachOrder);
                        }}
                      >
                        View ➜
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <div>
              <span>No product found!</span>
            </div>
          )}
        </table>
      </div>
    </div>
  );
}
