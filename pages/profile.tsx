import nookies from "nookies";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login, logout } from "../redux/user.slice";
import Button from "../components/Button";

const Profile = (properties: { user: { email: any; username: any } }) => {
  const router = useRouter();
  const {
    user: { email, username },
  } = properties;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const { user } = properties;
    dispatch(login({ ...user }));
    return () => {};
  }, []);

  const logoutUser = async () => {
    try {
      await axios.get("/api/logout");

      dispatch(logout({}));

      router.push("/login", undefined, { shallow: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <th className="py-4 px-6 text-xs text-gray-900 capitalize bg-gray-50 dark:bg-gray-700 font-bold dark:text-gray-400">Email</th>
            <td className="py-4 px-6 text-black dark:text-white">{email}</td>
            
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="py-4 px-6 text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Username</th>
            <td className="py-4 px-6 text-black dark:text-white">{username}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookies = nookies.get(context);
  let user;

  if (cookies?.jwt) {
    const { data } = await axios.get(`${process.env.URL_PREFIX}/auth/user/me`, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    user = data;
  }

  console.log(user);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Profile;
