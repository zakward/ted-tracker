import AuthForm from "./AuthForm";
import { UserContext } from "./context/userContext";
import { useState, useContext } from "react";

const initInputs = { username: "", password: "", email: "" };

function Login() {
  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext);

  const [inputs, setInputs] = useState(initInputs);

  const [toggle, setToggle] = useState(true);

  function togglePage() {
    setToggle((prev) => !prev);
    resetAuthErr();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
  }
  return (
    <>
      {toggle && (
        <>
          <AuthForm
            buttonText={"Login"}
            handleChange={handleChange}
            submit={handleLogin}
            inputs={inputs}
            errMsg={errMsg}
            togglePage={togglePage}
          />
          {/* <button className="form-btn" onClick={togglePage}>
            Need to Create an Account?
          </button> */}
        </>
      )}
      {!toggle && (
        <>
          <AuthForm
            buttonText={"Signup"}
            handleChange={handleChange}
            submit={handleSignup}
            inputs={inputs}
            errMsg={errMsg}
            togglePage={togglePage}
          />
          <button className="form-btn" onClick={togglePage}>
            Need to Login?
          </button>
        </>
      )}
    </>
  );
}

export default Login;
