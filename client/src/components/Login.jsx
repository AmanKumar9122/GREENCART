import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setShowUserLogin, setUser, setIsSeller, axios } = useAppContext();
  const [state, setState] = React.useState("login"); // login or register
  const [loginType, setLoginType] = React.useState("user"); // user or seller
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { navigate } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let endpoint = "";
      let payload = { email, password };

      if (loginType === "user") {
        endpoint = `/api/user/${state}`;
        if (state === "register") payload.name = name;
      } else {
        endpoint = "/api/seller/login"; // seller can only login
      }

      const { data } = await axios.post(endpoint, payload);

      if (data.success) {
        if (loginType === "user") {
          setUser(data.user);
          setShowUserLogin(false);
          navigate("/");
        } else {
          setIsSeller(true);
          navigate("/seller");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center
      text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">
            {loginType === "user" ? "User" : "Seller"}
          </span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Toggle Login Type */}
        <div className="flex gap-4 self-center text-xs">
          <button
            type="button"
            onClick={() => {
              setLoginType("user");
              setState("login");
            }}
            className={`${
              loginType === "user" ? "text-primary font-bold" : ""
            } underline`}
          >
            User Login / Register
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginType("seller");
              setState("login");
            }}
            className={`${
              loginType === "seller" ? "text-primary font-bold" : ""
            } underline`}
          >
            Seller Login
          </button>
        </div>

        {/* Name input for register */}
        {loginType === "user" && state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        {/* Switch between login/register (user only) */}
        {loginType === "user" && (
          <p>
            {state === "register" ? "Already have an account?" : "Create an account?"}{" "}
            <span
              onClick={() => setState(state === "login" ? "register" : "login")}
              className="text-primary cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
