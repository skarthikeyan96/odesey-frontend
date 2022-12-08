import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";

const handler = async (request: NextApiRequest, res: NextApiResponse) => {

        
  try {

    const jwt = request.cookies?.jwt;

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_PREFIX}/auth/user/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });


    res.status(200).send(data)
  } catch (error: any) {
    console.log(error)
    res.status(401).send(error.response.data || "Something went wrong ...");
  }
};

export default handler;
