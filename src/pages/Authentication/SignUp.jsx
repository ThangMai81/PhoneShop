import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../store/Cookie";
const userArr = [];
export default function SignUp({ handleChangePage }) {
  const inputClass = "block border-2 border-neutral-300 p-[15px] w-full";
  const warningEmailClass = "text-red-400 italic text-[12px]";
  const warningPasswordClass = "text-red-400 italic text-[12px]";
  const warningMissingClass = "text-red-400 italic text-[12px]";
  const inputBoxClass = "relative h-[65px]"
  const [fullname, setFullname] = useState({
    value: 1, // no first check when user get first access to the login page
    isFocused: false,
  });
  const [email, setEmail] = useState({
    value: 1,
    isFocused: false,
  });
  const [password, setPassword] = useState({
    value: 1,
    isFocused: false,
  });
  const [phone, setPhone] = useState({
    value: 1,
    isFocused: false,
  });
  const [sameEmail, setSameEmail] = useState(false);

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailValid = regex.test(email.value) && !sameEmail;
  const passwordValid = password.value.length >= 8;
  const fullFieldValid =
    fullname.value !== "" &&
    email.value !== "" &&
    password.value !== "" &&
    phone.value !== "";
  // These 4 onChange functions are used for changing placeholder when focused and change submit button immediately
  function handleGetFullnameValue(event) {
    setFullname({
      value: event.target.value,
      isFocused: true,
    });
  }
  function handleGetEmailValue(event) {
    setEmail({
      value: event.target.value,
      isFocused: true,
    });
  }
  function handleGetPasswordValue(event) {
    setPassword({
      value: event.target.value,
      isFocused: true,
    });
  }
  function handleGetPhoneValue(event) {
    setPhone({
      value: event.target.value,
      isFocused: true,
    });
  }
  // These 4 blur functions will triggered warning for users when user's done typing and not focus on input field
  function handleValidateFullnameInput(event) {
    setFullname({
      value: event.target.value,
      isFocused: false,
    });
  }
  function handleValidateEmailInput(event) {
    setEmail({
      value: event.target.value,
      isFocused: false,
    });
  }
  function handleValidatePasswordInput(event) {
    setPassword({
      value: event.target.value,
      isFocused: false,
    });
  }
  function handleValidatePhoneInput(event) {
    setPhone({
      value: event.target.value,
      isFocused: false,
    });
  }
  // this function will trigger when the button is clicked (validated) to save user into storage
  async function handleSignUp() {
    try {
      const response = await fetch(
        "https://PhoneShopBackEnd.onrender.com/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: fullname.value,
            email: email.value,
            password: password.value,
            phone: phone.value,
            role: "User",
          }),
          credentials: "include",
        }
      );
      if (response.status != 200) {
        if (response.status === 409) {
          window.alert("Email has been used!");
          return;
        }
        console.log(err);
      }
      const data = await response.json();
      console.log("response after sign up: ", data);
      // userArr.push({
      //   fullname: fullname.value,
      //   email: email.value,
      //   password: password.value,
      //   phone: phone.value,
      // });
      // localStorage.setItem("userArr", JSON.stringify(userArr));
      window.alert("Sign up successfully!");
      handleChangePage("Sign In");
    } catch (err) {
      throw new Error({ status: err.status, message: err.message });
    }
  }
  // this function to change to sign in modal
  function handleChange() {
    handleChangePage("Sign In");
  }
  return (
    <div className="absolute top-[5%] left-[30%] p-[20px] pb-0 w-[400px] text-center border-2 border-neutral-300 shadow shadow-indigo-500/40 rounded-xl bg-white">
      <h1 className="italic">Sign Up</h1>
      <div>
        <div className={`${inputBoxClass}`}>
            {/* If any field is missing */}
            {!fullFieldValid &&
            (!password.isFocused ||
              !email.isFocused ||
              !fullname.isFocused ||
              !phone.isFocused) && (
              <span className={warningMissingClass}>
                Please type in full information
              </span>
            )}
        </div>
        <div className="grid grid-rows-4 gap-[20px] mb-[20px]">
          <div className={`${inputBoxClass}`}>
            <input
              type="text"
              placeholder={"Full Name"}
              className={`${inputClass}`}
              onChange={handleGetFullnameValue}
              onBlur={handleValidateFullnameInput}
            />
          </div>
          <div className={`${inputBoxClass}`}>
            <input
              type="text"
              placeholder={"Email"}
              className={`${inputClass}`}
              onChange={handleGetEmailValue}
              onBlur={handleValidateEmailInput}
            />
            {/* If not correct syntax */}
            {!emailValid &&
              !email.isFocused &&
              email.value !== 1 &&
              !sameEmail && (
                <span className={warningEmailClass}>
                  Please type in correct syntax of email!
                </span>
            )}
          </div>
          <div className={`${inputBoxClass}`}>
            <input
              type="password"
              placeholder={"Password"}
              className={`${inputClass}`}
              onChange={handleGetPasswordValue}
              onBlur={handleValidatePasswordInput}
            />
            {/* If password is less then 8 chars */}
            {!passwordValid && !password.isFocused && password.value !== 1 && (
              <span className={warningPasswordClass}>
                Please type in password with more than 8 characters!
              </span>
            )}
          </div>
          <div className={`${inputBoxClass}`}>
            <input
              type="text"
              placeholder={"Phone"}
              className={`${inputClass}`}
              onChange={handleGetPhoneValue}
              onBlur={handleValidatePhoneInput}
            />
          </div>
          <button
            type="button"
            className={`bg-neutral-700 text-xs text-white uppercase h-[50px] ${
              // Not valid => add opacity
              !emailValid || !passwordValid || !fullFieldValid
                ? "opacity-20"
                : ""
            }`}
            // Not valid => disabled
            disabled={
              !emailValid || !passwordValid || !fullFieldValid ? true : false
            }
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <span className="italic text-slate-300">
            Already have an account?
            <span
              className="text-cyan-600 cursor-pointer"
              onClick={handleChange}
            >
              Click
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
