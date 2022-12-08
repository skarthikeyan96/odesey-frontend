import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from "nookies";
const Logout = async (request: NextApiRequest, res: NextApiResponse) => {
  destroyCookie({ res }, "jwt", {
    path: "/",
  });

  res.status(200).end();
};

export default Logout;