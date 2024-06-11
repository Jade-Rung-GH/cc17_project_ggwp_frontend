import { useState } from "react";
import validateLogin from "../validators/validate-login";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const initialInput = {
  username: "",
  password: "",
};

const initialInputError = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      }

      setInputError(initialInputError);
      await login(input);
      navigate("/");
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-4 mb-4">Login to your Account</div>
      <form onSubmit={handleSubmitForm} className="h-full">
        <div className=" h-76 w-full flex flex-col gap-4">
          <input
            className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
            placeholder="Username"
            name="username"
            value={input.username}
            error={inputError.username}
            onChange={handleChangeInput}
          />
          <input
            className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
            placeholder="Password"
            type="password"
            name="password"
            value={input.password}
            error={inputError.password}
            onChange={handleChangeInput}
          />
          <button className="bg-button px-3 py-1.5 rounded-md">Login</button>
          <hr className="my-6 border-[white]" />

          <h1>Don't have an account yet? Register Here!</h1>
          <button className="bg-buttonalt px-3 py-1.5 rounded-md" type="submit">
            Register
          </button>
        </div>
      </form>
    </>
  );
}
