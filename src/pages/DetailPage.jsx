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
  const response = useRouteLoaderData("root");
  const params = useParams();
  return (
    <Suspense>
      <Await resolve={response.data}>
        {(loadedData) => (
          <Detail listItems={loadedData} productId={params.productId} />
        )}
      </Await>
    </Suspense>
  );
}
export default DetailPage;
