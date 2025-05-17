import { json, NavLink, useNavigate } from "react-router-dom";
import { FaCartPlus, FaPersonBooth, FaShopify, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  addToCartButtonSlice,
  loginSlice,
  popSlice,
} from "../store/ReduxStore";
import { useEffect, useState } from "react";
function MainNavigation() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("auth-token") || {};
  const [username, setUsername] = useState("");
  // This state is to ensure not show the modal of categories in homepage whenever click the
  // home again
  const popUpArr = useSelector((state) => state.popUpReducer);
  function handleRemoveModal() {
    popUpArr.forEach((eachState, index) => {
      if (eachState.popUp === true) {
        dispatch(popSlice.actions.hide_popup(index));
      }
    });
  }
  // const loginState = Object.keys(userLogin).length > 0;
  // This state is just to ensure if the user has loggined before, after they had got access to the website again,
  // the state isLogin in redux store must be true, to show the username that has been used in local storage
  const loginState = useSelector((state) => state.loginReducer.isLogin);
  useEffect(() => {
    // If there's user's login before ?
    if (Object.keys(authToken).length > 0) {
      console.log("Exist auth token?");
      try {
        async function getUsername() {
          const response = await fetch(
            "https://PhoneShopBackEnd.onrender.com/auth/get-full-name",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          // Maybe not authorized
          if (response.status === 403 || response.status === 401) {
            localStorage.removeItem("auth-token");
            dispatch(loginSlice.actions.ON_LOGOUT());
            throw json(
              { message: "Session expired. Please login again." },
              { status: 401 }
            );
          } else if (response.status === 500) {
            throw json({ message: "Something wrong..." }, { status: 500 });
          }
          dispatch(loginSlice.actions.ON_LOGIN(authToken));
          const data = await response.json();
          setUsername(data.name);
        }
        getUsername();
      } catch (err) {
        console.log(err);
      }
    }
  }, [username]);
  function handleLogOut() {
    dispatch(loginSlice.actions.ON_LOGOUT());
    // *this is for navigating to main part
    dispatch(addToCartButtonSlice.actions.haveNotClicked());
  }
  return (
    <>
      {/* Link to use fontawesome icon */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      {/* ---------------Navigation rendered-part of this component----------------- */}
      <div className="flex justify-center">
        <nav
          className={
            "italic font-semibold flex justify-between m-[10px] w-[800px]"
          }
        >
          {/* Home + Shop button 1 div */}
          <div className={"flex w-[100px] justify-between"}>
            <NavLink
              to="/PhoneShop"
              className={({ isActive }) =>
                isActive ? `text-yellow-500` : undefined
              }
              onClick={handleRemoveModal}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? `text-yellow-500` : undefined
              }
            >
              Shop
            </NavLink>
          </div>
          {/* Cart + login button 1 div */}
          <div className={"flex w-[100px] justify-between mr-[60px]"}>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? `text-yellow-500` : undefined
              }
            >
              <div className="flex relative h-[30px] w-[100px]">
                <FaCartPlus className="absolute top-[15%] text-slate-400 left-[-10px]" />
                <div className="absolute left-[10px]">Cart</div>
              </div>
            </NavLink>
            {/* If user has loginned */}
            {!loginState ? (
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? `text-yellow-500` : undefined
                }
              >
                <div className="relative h-[30px] w-[100px]">
                  <FaUser className="absolute top-[15%] text-slate-400" />
                  <div className="absolute left-[20px]">Login</div>
                </div>
              </NavLink>
            ) : (
              <div className="relative h-[30px] w-[150px]">
                <FaUser className="absolute top-[15%] text-slate-400" />
                <div className="absolute left-[20px]">
                  {username}
                  <IoMdArrowDropdown className="absolute top-[20%] left-[30px]" />
                </div>
                <div
                  className="absolute left-[70px] w-[100px] cursor-pointer"
                  onClick={handleLogOut}
                >
                  (Logout)
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
export default MainNavigation;
