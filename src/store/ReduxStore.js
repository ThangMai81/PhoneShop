import { createSlice, configureStore, current } from "@reduxjs/toolkit";
import { stackTraceLimit } from "postcss/lib/css-syntax-error";
// Slice to control pop up for each products
const initialPopUpState = [];
for (let i = 0; i < 8; i++) {
  initialPopUpState.push({
    popUp: false,
  });
}
export const popSlice = createSlice({
  name: "showModal",
  initialState: initialPopUpState,
  reducers: {
    show_popup(state, action) {
      state[action.payload].popUp = true;
      // To ensure when we click modal 1 -> click modal 2 the modal 1 disappear
      for (let i = 0; i < state.length; i++) {
        if (i != action.payload && state[i].popUp === true) {
          state[i].popUp = false;
        }
      }
    },
    hide_popup(state, action) {
      state[action.payload].popUp = false;
    },
  },
});
// Slice to manage categorizing products
const initialCategoriesCLickState = {
  brandClick: { name: "", isClicked: false },
  typeClick: "",
};
export const categoriesClickSlice = createSlice({
  name: "categorize products",
  initialState: initialCategoriesCLickState,
  reducers: {
    getBrandClick(state, action) {
      state.brandClick.name = String(action.payload);
      state.brandClick.isClicked = true;
    },
    getTypeClick(state, action) {
      state.typeClick = String(action.payload);
      // To make sure that when click All, all categories with show up and not coincidence with typeClick
      state.brandClick.isClicked = false;
    },
  },
});
// Slice to manage login state (to change login -> logout and so on)
const initialLoginState = { isLogin: false };
export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = true;
      // Save to local storage
      localStorage.setItem("user-login", JSON.stringify(action.payload));
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
      localStorage.removeItem("user-login");
    },
  },
});
// Slice to manage the cart for user
const initialCartState = JSON.parse(localStorage.getItem("cart")) || [];
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    ADD_CART(state, action) {
      // In case user click the button ADD TO CART in detail page more than once
      let existedItem = [];
      if (state.length > 0) {
        existedItem = state.filter(
          (eachItem) =>
            JSON.stringify(eachItem.item) == JSON.stringify(action.payload.item)
        );
      }
      if (existedItem.length === 0) {
        state.push(action.payload);
      } else {
        const index = state.findIndex((eachProduct) => {
          return (
            JSON.stringify(eachProduct.item) ==
            JSON.stringify(action.payload.item)
          );
        });
        // Increase quantity of existed items that user has been added
        state[index].quantity += action.payload.quantity;
      }
      // save to local storage to save cart for user's account
      localStorage.setItem("cart", JSON.stringify(state));
    },
    UPDATE_CART(state, action) {
      const index = state.findIndex((eachProduct) => {
        return (
          JSON.stringify(eachProduct.item) ==
          JSON.stringify(action.payload.item)
        );
      });
      // console.log(current(state));
      // console.log(action.payload.item);
      // console.log(index);
      if (action.payload.state === "increase") state[index].quantity += 1;
      else {
        console.log("this state");
        if (state[index].quantity > 0) {
          state[index].quantity -= 1;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    DELETE_CART(state, action) {
      const index = state.findIndex((eachProduct) => {
        return (
          JSON.stringify(eachProduct.item) === JSON.stringify(action.payload)
        );
      });
      state.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
// Slice to manage add to cart button is clicked or not
const addToCartButtonState = { isClicked: false };
export const addToCartButtonSlice = createSlice({
  name: "add-to-cart-clicked",
  initialState: addToCartButtonState,
  reducers: {
    haveClicked(state) {
      state.isClicked = true;
    },
    haveNotClicked(state) {
      state.isClicked = false;
    },
  },
});
// Store
export const store = configureStore({
  reducer: {
    popUpReducer: popSlice.reducer,
    categoriesReducer: categoriesClickSlice.reducer,
    loginReducer: loginSlice.reducer,
    cartReducer: cartSlice.reducer,
    addToCartButtonReducer: addToCartButtonSlice.reducer,
  },
});
