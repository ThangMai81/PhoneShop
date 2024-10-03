import { useState } from "react";
import { useRef } from "react";
import { Form } from "react-router-dom";

export default function AnotherInfo({ popUpClass }) {
  const headerEl = "uppercase italic";
  const pEl = "text-neutral-400 italic";
  const divPEl = "justify-self-center";
  // Email validation
  const email = useRef();
  const [isValid, setIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  // regex for email validation
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;
  let message = "";
  message = !isValid && email.current.value == "" && "Please enter your email!";
  message =
    !isValid &&
    email.current.value != "" &&
    "Wrong email, please type correct syntax (with @)";
  // placeholder change
  function handleCheckValidEmail() {
    if (email.current.value === "") {
      setIsValid(false);
    }
    if (email.current.value !== "") {
      setIsValid(true);
    }
    setIsTyping(true);
  }
  function handleBlur() {
    if (email.current.value === "") {
      setIsValid(false);
    }
    if (!regex.test(email.current.value)) {
      setIsValid(false);
    }
  }
  function handleCheckValid() {}
  return (
    <div className={`${popUpClass}`}>
      <div className="h-[150px] w-auto bg-neutral-200 grid grid-cols-3 content-center">
        <div className={divPEl}>
          <h1 className={headerEl}>Free shipping</h1>
          <p className={pEl}>Free shipping worldwide</p>
        </div>
        <div className={divPEl}>
          <h1 className={headerEl}>24x7 service</h1>
          <p className={pEl}>Free shipping worldwide</p>
        </div>
        <div className={divPEl}>
          <h1 className={headerEl}>Festival order</h1>
          <p className={pEl}>Free shipping worldwide</p>
        </div>
      </div>
      <div className="grid grid-cols-2 h-[100px] content-center">
        <div>
          <h1 className={headerEl}>Let's be friends!</h1>
          <p className={pEl}>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <Form className="w-full grid grid-cols-3">
          <div className="col-span-2 relative">
            <input
              type="text"
              name="email"
              placeholder={!isTyping ? "Enter your email address" : ""}
              className="border-[1px] border-black px-[20px] py-[15px] w-full"
              onChange={handleCheckValidEmail}
              onBlur={handleBlur}
              ref={email}
            />
            {!isValid && (
              <span className="absolute left-0 top-[101%]">{message}</span>
            )}
          </div>
          <button
            type="button"
            className={`bg-neutral-800 text-white px-[30px] py-[16px] w-auto col-span-1 ${
              !isValid && "opacity-30"
            }`}
            onClick={handleCheckValid}
            disabled={!isValid}
          >
            Subscribe
          </button>
        </Form>
      </div>
    </div>
  );
}
