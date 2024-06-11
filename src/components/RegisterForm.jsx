import { useState } from "react";
import { toast } from "react-toastify";
import validateRegister from "../validators/validate-register";
import authApi from "../apis/auth";
import { AxiosError } from "axios";

const initialInput = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  phone: "",
};

const initialInputError = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  phone: "",
};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const response = { ...input };
      if (response.phone === "") {
        delete response.phone;
      }
      // console.log(input);
      const error = validateRegister(response);
      if (error) {
        console.log(error);
        return setInputError(error);
      }
      setInputError({ ...initialInput });

      await authApi.register(response);
      // onSuccess();
      toast.success("Registered Successfully, Please Login to Continue");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response.data.field === "username") {
          setInputError((prev) => ({
            ...prev,
            username: "Username is already in used",
          }));
        }
      }
    }
  };

  return (
    <>
      <div className="mt-4 mb-4">Register New Account</div>
      <form onSubmit={handleSubmitForm}>
        <div className="flex flex-col gap-4">
          <div>
            <input
              className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
              placeholder={"Username"}
              value={input.username}
              name="username"
              onChange={handleChangeInput}
              error={inputError.username}
            />
          </div>
          <div>
            <input
              className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
              placeholder={"Password"}
              value={input.password}
              name="password"
              onChange={handleChangeInput}
              type="password"
              error={inputError.password}
            />
          </div>
          <div>
            <input
              className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
              placeholder={"Confirm Password"}
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={handleChangeInput}
              type="password"
              error={inputError.confirmPassword}
            />
          </div>
          <div>
            <input
              className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
              placeholder={"Email Address"}
              value={input.email}
              name="email"
              onChange={handleChangeInput}
              error={inputError.email}
            />
          </div>
          <div>
            <input
              className="text-[color:black] px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2"
              placeholder={"Phone Number, Optional"}
              value={input.phone}
              name="phone"
              onChange={handleChangeInput}
              error={inputError.phone}
            />
          </div>
          <div className="bg-buttonalt col-span-2 text-center rounded-md">
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </>
  );
}
