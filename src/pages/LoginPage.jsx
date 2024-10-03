import { useState } from "react";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import banner1 from "/banner1.jpg";
function LoginPage() {
  const [changePage, setChangePage] = useState("Sign Up");

  function handleChangePage(namePage) {
    setChangePage(namePage);
  }

  return (
    <div className="relative">
      <img src={banner1}></img>
      {changePage === "Sign Up" && (
        <SignUp handleChangePage={handleChangePage} />
      )}
      {changePage === "Sign In" && (
        <SignIn handleChangePage={handleChangePage} />
      )}
    </div>
  );
}
export default LoginPage;
