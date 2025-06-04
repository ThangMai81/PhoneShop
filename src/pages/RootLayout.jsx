import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainNavigation from "../components/MainNavigation";
function RootLayout() {
  return (
    <div className="flex flex-col">
      <MainNavigation />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default RootLayout;
