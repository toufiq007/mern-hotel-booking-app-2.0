import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../apiClient";
import { useAppContext } from "../../context/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: () => {
      showToast({ message: "user logout succesfull", type: "SUCCESS" });
    },
  });
  const handleLogout = () => {
    console.log("logout hoiche");
    mutation.mutate();
  };

  return (
    <span className="bg-red-600 flex items-center px-2 hover:bg-red-500 font-bold text-white">
      <Link to="/sign-in" onClick={handleLogout}>
        Sign Out
      </Link>
    </span>
  );
};

export default SignOutButton;
