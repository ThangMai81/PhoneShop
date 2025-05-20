import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import { loader as HomePageLoader } from "./pages/HomePage";
import { Provider } from "react-redux";
import { store } from "./store/ReduxStore";
import { loader as DetailPageLoader } from "./pages/DetailPage";
import HistoryPage from "./pages/HistoryPage";
import { loader as HistoryPageLoader } from "./pages/HistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import { loader as OrderDetailPageLoader } from "./pages/OrderDetailPage";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: HomePageLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: DetailPageLoader,
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />, // Layout route bảo vệ
        children: [
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "transaction",
            element: <HistoryPage />,
            loader: HistoryPageLoader,
          },
          {
            path: "transaction/:orderId",
            element: <OrderDetailPage />,
            loader: OrderDetailPageLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
