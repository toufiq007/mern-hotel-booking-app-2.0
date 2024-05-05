import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../apiClient";
import { useAppContext } from "../context/AppContext";

export type RegisterdFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const queryClient = useQueryClient()
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterdFormType>();
  // const onSubmit = (data: any) => {
  //   console.log(data);
  // };

  // use react query for mutate our data
  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration successfull!!", type: "SUCCESS" });
      console.log("user registration successfull");
      await queryClient.invalidateQueries("auth_token");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
      console.log(error.message);
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <div className="">
      <h1 className="text-3xl mb-4">Create an account</h1>
      <form className="" onSubmit={onSubmit}>
        <div className="input-fields flex flex-col md:flex-row justify-between gap-5">
          <div className="inputs flex-1">
            <label htmlFor="" className="mr-4 mb-3">
              First Name
            </label>
            <br />
            <input
              {...register("firstName", { required: "this field is required" })}
              type="text"
              className="border border-gray-300 p-1 rounded-md w-full"
              placeholder="enter first name"
            />
            {errors && errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="inputs flex-1">
            <label htmlFor="" className="mr-4 mb-3">
              Last name
            </label>
            <br />
            <input
              {...register("lastName", { required: "this field is required" })}
              type="text"
              className="border border-gray-300 p-1 rounded-md w-full"
              placeholder="enter last name"
            />
            {errors && errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
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
        <div className="input-fields mt-3">
          <label htmlFor="">Confirm Password</label>
          <input
            {...register("confirm_password", {
              validate: (val) => {
                if (!val) {
                  return "this field is required";
                } else if (val !== watch("password")) {
                  return "your password do not match";
                }
              },
            })}
            type="password"
            placeholder="confirm password"
            className="border border-gray-300 p-1 rounded-md w-full"
          />
          {errors && errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-3">
          <div className="">
            <span className="mr-3">Already registered?</span>
            <span>
              <Link
                to="/sign-in"
                className=""
                style={{ borderBottom: "2px solid #000" }}
              >
                Sign in here
              </Link>
            </span>
          </div>
          <button type="submit" className="bg-blue-800 text-white py-3 px-3">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
