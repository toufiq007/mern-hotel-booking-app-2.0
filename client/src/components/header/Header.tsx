import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-3 ">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white capitalize font-bold">
          <Link to="/">awesomeholydays.com</Link>
        </span>
        {isLoggedIn ? (
          <div className="flex gap-4">
            <span className="bg-white flex items-center px-2 hover:bg-gray-400 font-bold text-blue-600">
              <Link to="/my-bookings">My Bookings</Link>
            </span>
            <span className="bg-white flex items-center px-2 hover:bg-gray-400 font-bold text-blue-600">
              <Link to="/my-hotels">By Hotels</Link>
            </span>
            <span className="bg-white flex items-center px-2 hover:bg-gray-400 font-bold text-blue-600">
              <Link to="/signOut">Sign Out</Link>
            </span>
          </div>
        ) : (
          <span className="bg-white flex items-center px-2 hover:bg-gray-400 font-bold text-blue-600">
            <Link to="/sign-in">Sign In</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
