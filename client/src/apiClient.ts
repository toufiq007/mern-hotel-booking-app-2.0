import { RegisterdFormType } from "./pages/Register";
import { SignInFormProps } from "./pages/SignIn";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterdFormType) => {
  const response = await fetch(`http://localhost:3000/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormProps) => {
  const response = await fetch(`http://localhost:3000/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(
    `http://localhost:3000/api/auth/validate-token`,
    {
      credentials: "include",
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Token Invalid");
  }
  return response.json();
};

// export const fetchUserList = async () => {
//   const url = "https://jsonplaceholder.typicode.com/users";
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const responseBody = await response.json();
//   if (!response.ok) {
//     throw new Error(responseBody.message);
//   }

//   return responseBody;
// };
