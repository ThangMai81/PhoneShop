import { NavLink, useNavigate } from "react-router-dom";
import { FaCartPlus, FaPersonBooth, FaShopify, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { addToCartButtonSlice, loginSlice } from "../store/ReduxStore";
function MainNavigation() {
  const dispatch = useDispatch();
  const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
  const userLogin = JSON.parse(localStorage.getItem("user-login")) || {};
  // const loginState = Object.keys(userLogin).length > 0;
  // This state is just to ensure if the user has loggined before, after they had got access to the website again,
  // the state isLogin in redux store must be true, to show the username that has been used in local storage
  if (Object.keys(userLogin).length > 0) {
    dispatch(loginSlice.actions.ON_LOGIN(userLogin));
  }
  const loginState = useSelector((state) => state.loginReducer.isLogin);
  let userName = "";
  if (loginState) {
    userName = userArr.filter(
      (eachUser) =>
        eachUser.email === userLogin.email &&
        eachUser.password === userLogin.password
    )[0].fullname;
  }
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
              to="/"
              className={({ isActive }) =>
                isActive ? `text-yellow-500` : undefined
              }
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
                <FaCartPlus className="absolute top-[15%] text-slate-400" />
                <div className="absolute left-[20px]">Cart</div>
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
                  {userName}
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
