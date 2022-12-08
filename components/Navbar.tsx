import { useTheme } from "next-themes";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import NavLink from "./NavLink";
import axios from "axios";
import { logout } from "../redux/user.slice";

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const { isAuthenticated } = useSelector((state: any) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   // check if authenticated
  //   if (isAuthenticated) {
  //     router.push("/dashboard");
  //   }else{
  //     router.push("/login")
  //   }
  // }, []);

  const renderThemeToggle = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <button
          className="rounded-sm p-2"
          onClick={() => setTheme("light")}
          type="button"
        >
          <MoonIcon className="h-6 w-6 " />
        </button>
      );
    }
    return (
      <button
        className=" rounded-sm p-2"
        onClick={() => setTheme("dark")}
        type="button"
      >
        <SunIcon className="h-6 w-6 " />
      </button>
    );
  };

  const renderAuthButtons = () => {
    return (
      <>
        <li>
          <NavLink name="Login" route="login" />
        </li>

        <li>
          <NavLink name="Register" route="register" />
        </li>
      </>
    );
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/logout");

      dispatch(logout({}));

      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };

  const renderAppButtons = () => {
    // set of buttons to be rendered when the user is authenticated

    return (
      <>
        <li>
          <NavLink name="Profile" route="admin/profile" />
        </li>
        <li>
          <button
            className="block py-2 pl-3 pr-2 text-black dark:text-white md:bg-transparent"
            aria-current="page"
            onClick={logoutUser}
          >
            Logout
          </button>
        </li>
      </>
    );
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2  text-black shadow-sm dark:bg-slate-800 dark:text-white">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/admin/dashboard" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap ">
            Odesey
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border dark:text-white dark:bg-slate-800  border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            {!isAuthenticated && renderAuthButtons()}

            {isAuthenticated && renderAppButtons()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
