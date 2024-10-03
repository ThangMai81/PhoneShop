import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainNavigation from "../components/MainNavigation";
function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
export default RootLayout;
