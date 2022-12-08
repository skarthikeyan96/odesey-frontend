import nookies from "nookies";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../redux/user.slice";
import Button from "../../components/Button";

const Profile = (properties: { user: { email: any; username: any } }) => {
  const router = useRouter();
  const {
    user: { email, username },
  } = properties;

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const { user } = properties;
  //   dispatch(login({ ...user }));
  //   return () => {};
  // }, []);


  const handleDelete = () => {
    console.log("delete API action")
  }
  return (
    <div className="p-4">
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <th className="py-4 px-6 text-xs text-gray-900 capitalize bg-gray-50 dark:bg-gray-700 font-bold dark:text-gray-400">
              Email
            </th>
            <td className="py-4 px-6 text-black dark:text-white">{email}</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="py-4 px-6 text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              Username
            </th>
            <td className="py-4 px-6 text-black dark:text-white">{username}</td>
          </tr>
          <tr>
            <td className="py-4 px-6 text-black dark:text-white">
              <button
                type="button"
                onClick={handleDelete}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Delete account
              </button>
            </td>
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
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL_PREFIX}/auth/user/me`,
      {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      }
    );
    user = data;
  }

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
