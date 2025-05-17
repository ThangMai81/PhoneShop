import { Suspense } from "react";
import {
  Await,
  defer,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import Detail from "./DetailPage/Detail";
function DetailPage() {
  const response = useLoaderData();
  const params = useParams();
  return (
    <Suspense>
      <Await resolve={response.data}>
        {(loadedData) => (
          <Detail
            Item={loadedData.product}
            RelatedProducts={loadedData.relatedProducts}
          />
        )}
      </Await>
    </Suspense>
  );
}
export default DetailPage;

async function loadProductWithId(params) {
  const response = await fetch(
    `https://PhoneShopBackEnd.onrender.com/product/${params}`
  );
  console.log("response: ", response);
  if (!response.ok) {
    throw json({ message: "Cannot fetching data..." }, { status: 500 });
  }
  const data = await response.json();
  return data;
}

export function loader({ params }) {
  return defer({
    data: loadProductWithId(params.productId),
  });
}
