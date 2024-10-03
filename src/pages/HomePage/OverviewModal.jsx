import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { popSlice } from "../../store/ReduxStore";
import { IoMdClose } from "react-icons/io";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
function OverviewModal({ item, index }) {
  const navigate = useNavigate();
  function handleNavigateDetailPage() {
    navigate(`detail/${item._id["$oid"]}`);
  }
  const dispatch = useDispatch();
  const popState = useSelector((state) => state.popUpReducer[index].popUp);
  function handleNotShowModal() {
    dispatch(popSlice.actions.hide_popup(index));
  }
  return (
    <dialog className="grid grid-cols-2 p-[10px] max-w-[900px] max-h-auto fixed top-[50%] bottom-[50%]">
      <img src={item.img1} className="max-w-[420px]" />
      <div className="relative">
        <h1 className="italic font-semibold text-xl">{item.name}</h1>
        <p className="italic text-neutral-400">{`${Number(
          item.price
        ).toLocaleString()} VND`}</p>
        <p className="italic text-xs text-neutral-300">{item.long_desc}</p>
        <button
          type="button"
          onClick={handleNavigateDetailPage}
          className="text-white bg-neutral-800 py-[10px] px-[5px] mt-[10px]"
        >
          <div className="flex relative h-[20px] w-[100px] ">
            <FaCartPlus className="absolute top-[15%] text-slate-400" />
            <div className="absolute left-[20px]">View detail</div>
          </div>
        </button>

        <button
          className="border-2 border-black absolute top-0 right-0 w-[20px] h-[20px] text-center"
          onClick={handleNotShowModal}
        >
          <span className="hover:cursor-pointer">
            <IoMdClose />
          </span>
        </button>
      </div>
    </dialog>
  );
}
export default OverviewModal;
