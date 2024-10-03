import ProductsItem from "./ProductsItem";

export default function ProductsList({ listItems, popUpClass }) {
  const list8Items = [];
  listItems.forEach((eachItem, i) => {
    if (i <= 7) {
      list8Items.push(eachItem);
    }
  });
  return (
    <div className={`mt-[40px]`}>
      <p className={`uppercase text-sm italic text-neutral-400 ${popUpClass}`}>
        Made the hard way
      </p>
      <p className={`uppercase text-2xl italic mb-[20px] ${popUpClass}`}>
        Top trending products
      </p>
      <div className="grid grid-cols-4">
        {list8Items.map((eachItem, index) => (
          <ProductsItem
            item={eachItem}
            key={eachItem._id["$oid"]}
            index={index}
            popUpClass={popUpClass}
          />
        ))}
      </div>
    </div>
  );
}
