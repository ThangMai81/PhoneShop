import { useRef } from "react";
import OverviewModal from "./OverviewModal";
import { Provider, useDispatch, useSelector } from "react-redux";
import { popSlice } from "../../store/ReduxStore";
import { useNavigate } from "react-router-dom";
export default function ProductsItem({ item, index, showModal, popUpClass }) {
  const dispatch = useDispatch();
  const popState = useSelector((state) => state.popUpReducer[index].popUp);
  const popArrState = useSelector((state) => state.popUpReducer);
  // console.log("new popUp array: ", popArrState);
  const navigate = useNavigate();
  function handleOnClick() {
    // if clicked in homepage
    if (showModal) {
      dispatch(popSlice.actions.show_popup(index));
    }
    // if clicked in shop page
    else {
      navigate(`/PhoneShop/detail/${item._id["$oid"]}`);
    }
  }
  let havePoped = false;
  popArrState.forEach((popState) => {
    if (popState.popUp === true) {
      havePoped = true;
    }
  });
  return (
    <>
      {popState && showModal && (
        <OverviewModal
          item={item}
          index={index}
          className="duration-1000 translate-y-24"
        />
      )}
      <button
        type="button"
        className={`mb-[20px] mr-[10px] ${
          !havePoped ? "hover:cursor-pointer" : undefined
        } ${popUpClass}`}
        onClick={handleOnClick}
        disabled={havePoped ? true : false}
      >
        <img src={item.img1} />
        <p className="text-center italic">{item.name}</p>
        <p className="text-center text-neutral-400 italic">
          {`${Number(item.price).toLocaleString()} VND`}
        </p>
      </button>
    </>
  );
}
