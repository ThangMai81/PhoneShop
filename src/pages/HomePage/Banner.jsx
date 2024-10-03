import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import bannerImg from "../../../public/banner1.jpg";

export default function Banner({ popUpClass }) {
  // const popUpState = useSelector((state) => state.popUpReducer);
  // let isPopUp = false;
  // for (let i = 0; i < 8; i++) {
  //   if (popUpState[i].popUp === true) {
  //     isPopUp = true;
  //     break;
  //   }
  // }
  return (
    <div className={`relative ${popUpClass}`}>
      <img src={bannerImg} className="h-[400px]" />
      <div className="absolute left-[50px] top-[30%]">
        <span className="text-neutral-400 italic uppercase text-xs">
          New Inspiration 2020
        </span>
        <h1 className="text-3xl max-w-[350px] italic mb-[10px]">
          20% OFF ON NEW SEASON
        </h1>
        <Link
          to="shop"
          className="bg-neutral-800 font-thin text-white italic px-[10px] py-[5px]"
        >
          Browse collections
        </Link>
      </div>
    </div>
  );
}
