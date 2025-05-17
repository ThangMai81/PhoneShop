export default function OrderDetail({ order }) {
  return (
    <div className="overflow-x-auto">
      <div className="max-w-[1100px] mx-auto">
        <table className="min-w-full table-auto border-collapse text-center">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
            <tr>
              <th className="px-4 py-2">ID PRODUCT</th>
              <th className="px-4 py-2">IMAGE</th>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">COUNT</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {order.cart.map((eachProduct) => {
              return (
                <tr
                  key={eachProduct.product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{eachProduct.product._id}</td>
                  <td className="px-4 py-2">
                    <img
                      src={eachProduct.product.img1}
                      className="w-[100px] h-auto"
                      placeholder={eachProduct.product.short_desc}
                    />
                  </td>
                  <td className="px-4 py-2">{eachProduct.product.name}</td>
                  <td className="px-4 py-2">
                    {Number(eachProduct.product.price).toLocaleString("vi-VN")}{" "}
                    VND
                  </td>
                  <td>{eachProduct.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
