import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

const handler = async (request: NextApiRequest, res: NextApiResponse) => {
  const { password, email } = request.body;

  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_PREFIX}/auth/login`,
      formData
    );

    setCookie({ res }, "jwt", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax"
    });

    res.status(200).send({ message: "success" });
  } catch (error: any) {
    console.log(error)
    res.status(401).send(error.response.data || "Something went wrong ...");
  }
};

export default handler;
