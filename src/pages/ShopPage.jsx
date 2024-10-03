import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import CategoriesShop from "./ShopPage/CategoriesShop";
import ShowSearchedPhone from "./ShopPage/ShowSearchedPhone";

function ShopPage() {
  const response = useRouteLoaderData("root");
  return (
    <div className="flex justify-center">
      <div className="w-[900px]">
        {/* Banner */}
        <div className="bg-slate-100 p-[20px] pl-[30px] pr-[30px] h-[150px] grid grid-cols-2 content-center ">
          <div className="uppercase italic font-[350] text-[30px]">Shop</div>
          <div className="justify-self-end italic font-[500] text-sm uppercase text-slate-300 pt-[15px]">
            shop
          </div>
        </div>
        <div className="grid grid-cols-4">
          {/* Categories bar */}
          <CategoriesShop />
          <div className="col-span-3">
            <Suspense fallback={<p>Isloading</p>}>
              <Await resolve={response.data}>
                {(loadedPhone) => <ShowSearchedPhone listItems={loadedPhone} />}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShopPage;
