import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
// import { Link } from "react-router-dom";
import * as apiClient from "../apiClient";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormProps = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signIn, {
    // when we do post request then use usemMutaion
    onSuccess: async () => {
      showToast({ message: "login successfull", type: "SUCCESS" });
      console.log("user registration successfull");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
      console.log(err);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>();
  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    mutation.mutate(data);
  });
  return (
    <div className="">
      <h1 className="text-3xl mb-4">Create an account</h1>
      <form className="" onSubmit={onSubmit}>
        <div className="input-fields mt-3">
          <label htmlFor="">Email</label>
          <input
            {...register("email", { required: "this field is required" })}
            type="text"
            placeholder="enter email"
            className="border border-gray-300 p-1 rounded-md w-full"
          />
          {errors && errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="input-fields mt-3">
          <label htmlFor="">Password</label>
          <input
            {...register("password", {
              required: "this field is required",
              minLength: {
                value: 6,
                message: "password must be at lease 6 or more character",
              },
            })}
            type="password"
            placeholder="enter password"
            className="border border-gray-300 p-1 rounded-md w-full"
          />
          {errors && errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-3">
          <div className="">
            <span className="mr-3">Create a new Account?</span>
            <span>
              <Link
                to="/register"
                className=""
                style={{ borderBottom: "2px solid #000" }}
              >
                Register here
              </Link>
            </span>
          </div>
          <button type="submit" className="bg-blue-800 text-white py-3 px-3">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
