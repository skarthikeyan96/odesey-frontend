import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies } from "nookies";

const handler = async (request: NextApiRequest, res: NextApiResponse) => {
  if (request.method === "GET") {
    try {
      const jwt = request.cookies?.jwt;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL_PREFIX}/auth/user/me`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      res.status(200).send(data);
    } catch (error: any) {
      console.log(error);
      res.status(401).send(error.response.data || "Something went wrong ...");
    }
  } else {
    if (request.method === "DELETE") {
      try {
        const { username } = request.body;
        const jwt = request.cookies?.jwt;

        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_URL_PREFIX}/auth/user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        // destroy the cookie
        destroyCookie({ res }, "jwt", {
          path: "/",
        });

        res.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  }
};

export default handler;
