import { useRef } from "react";
import OverviewModal from "./OverviewModal";
import { Provider, useDispatch, useSelector } from "react-redux";
import { popSlice } from "../../store/ReduxStore";
import { useNavigate } from "react-router-dom";
export default function ProductsItem({ item, index, showModal, popUpClass }) {
  const dispatch = useDispatch();
  const popState = useSelector((state) => state.popUpReducer[index].popUp);
  const navigate = useNavigate();
  function handleOnClick() {
    if (showModal === true) {
      dispatch(popSlice.actions.show_popup(index));
    } else {
      navigate(`/detail/${item._id["$oid"]}`);
    }
  }
  return (
    <>
      {popState && showModal && (
        <OverviewModal
          item={item}
          index={index}
          className="duration-1000 translate-y-24"
        />
      )}
      <div
        className={`mb-[20px] mr-[10px] hover:cursor-pointer ${popUpClass}`}
        onClick={handleOnClick}
      >
        <img src={item.img1} />
        <p className="text-center italic">{item.name}</p>
        <p className="text-center text-neutral-400 italic">
          {`${Number(item.price).toLocaleString()} VND`}
        </p>
      </div>
    </>
  );
}
