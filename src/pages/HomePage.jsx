import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  defer,
  json,
  useLoaderData,
  Await,
  useRouteLoaderData,
} from "react-router-dom";
import AnotherInfo from "./HomePage/AnotherInfo";
import Banner from "./HomePage/Banner";
import Categories from "./HomePage/Categories";
import ProductsList from "./HomePage/ProductsList";

function HomePage() {
  const response = useRouteLoaderData("root");
  const popUpState = useSelector((state) => state.popUpReducer);
  let isPopUp = false;
  for (let i = 0; i < 8; i++) {
    if (popUpState[i].popUp === true) {
      isPopUp = true;
      break;
    }
  }
  const averageOpacity = "opacity-5 blur-sm bg-slate-500";
  return (
    <>
      <div className={`flex justify-center`}>
        <div className="w-[900px]">
          {/* Banner */}
          <Banner popUpClass={`${isPopUp && averageOpacity}`} />
          {/* Categories */}
          <Categories popUpClass={`${isPopUp && averageOpacity}`} />
          {/* List of products */}
          <Suspense fallback={<p>Is loading...</p>}>
            <Await resolve={response.data}>
              {(loadedData) => (
                <ProductsList
                  listItems={loadedData}
                  popUpClass={`${isPopUp && averageOpacity}`}
                />
              )}
            </Await>
          </Suspense>
          {/* Another info */}
          <AnotherInfo popUpClass={`${isPopUp && averageOpacity}`} />
        </div>
      </div>
    </>
  );
}
export default HomePage;

async function loadProducts() {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  if (!response.ok) {
    throw json({ message: "Cannot fetching data..." }, { status: 500 });
  }
  const data = await response.json();
  return data;
}

export function loader() {
  return defer({
    data: loadProducts(),
  });
}
