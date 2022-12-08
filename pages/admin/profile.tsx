import nookies from "nookies";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../redux/user.slice";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

const Profile = (properties: { user: { email: any; username: any }, isAuthenticated: boolean }) => {
  const router = useRouter();
  const {
    user: { email, username },
    isAuthenticated
  } = properties;

  const dispatch = useDispatch();

  const handleDelete = () => {
    axios.delete('/api/user', {data: {username: username}})
  };

  const [checked, setChecked] = React.useState(false);

  return (
    <> 
      <Navbar isAuthenticated={isAuthenticated}/>
      <div className="p-4">
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
            <th className="py-4 px-6 text-md text-gray-900 capitalize bg-gray-50 dark:bg-gray-700 font-bold dark:text-gray-400">
              Email
            </th>
            <td className="py-4 px-6 text-black dark:text-white text-md">{email}</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="py-4 px-6 text-md text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
              Username
            </th>
            <td className="py-4 px-6 text-black dark:text-white">{username}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex pt-8 space-y-2 flex-col" id="delete-account">
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            onChange={() => setChecked(!checked)}
            checked={checked}
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
            Please give confirmation to delete the account
          </label>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!checked}
          className="text-white w-1/4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Delete account
        </button>
      </div>
    </div>
    </>
   
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
      isAuthenticated: true
    },
  };
};

export default Profile;
