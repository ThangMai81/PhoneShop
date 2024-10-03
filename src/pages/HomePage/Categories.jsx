import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import product1 from "../../../public/product_1.png";
import product2 from "../../../public/product_2.png";
import product3 from "../../../public/product_3.png";
import product4 from "../../../public/product_4.png";
import product5 from "../../../public/product_5.png";

export default function Categories({ popUpClass }) {
  const navigate = useNavigate();
  function handleNavigateShopPage() {
    navigate("shop");
  }
  // To change opacity when dialog is shown
  // const popUpState = useSelector((state) => state.popUpReducer);
  // let isPopUp = false;
  // for (let i = 0; i < 8; i++) {
  //   if (popUpState[i].popUp === true) {
  //     isPopUp = true;
  //     break;
  //   }
  // }
  const hoverEff = "hover:cursor-pointer hover:opacity-70 transition-opacity";
  return (
    <div className={`mt-[40px] ${popUpClass}`}>
      <div className="grid grid-rows-2 justify-center">
        <span className="uppercase justify-self-center text-xs text-neutral-400 italic content-end">
          Carefully created Collections
        </span>
        <h1 className="uppercase justify-self-center italic text-xl">
          Browse our categories
        </h1>
      </div>
      {/* List of image */}
      <div>
        <div className="grid grid-cols-2 mb-[20px] gap-[20px]">
          <img
            src={product1}
            onClick={handleNavigateShopPage}
            className={hoverEff}
          />
          <img
            src={product2}
            onClick={handleNavigateShopPage}
            className={hoverEff}
          />
        </div>
        <div className="grid grid-cols-3 gap-[20px]">
          <img
            src={product3}
            onClick={handleNavigateShopPage}
            className={hoverEff}
          />
          <img
            src={product4}
            onClick={handleNavigateShopPage}
            className={hoverEff}
          />
          <img
            src={product5}
            onClick={handleNavigateShopPage}
            className={hoverEff}
          />
        </div>
      </div>
    </div>
  );
}
