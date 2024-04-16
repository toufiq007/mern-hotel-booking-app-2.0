import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-red-800 py-8">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white capitalize font-bold">
          <Link to="/">awesomeholydays.com</Link>
        </span>
        <span className=" flex gap-5 items-center px-2 font-bold text-white">
          <Link to="/sign-in" className="cursor-pointer">
            Privacy Policy
          </Link>
          <Link to="/sign-in" className="cursor-pointer">
            Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
