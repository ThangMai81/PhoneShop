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
      <img src={banner1} className="h-[700px]"></img>
      <section className="w-full py-16 bg-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Sign in to access exclusive deals and fast checkout. Your time is valuable, and we make shopping simple.
        </p>
      </section>
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
