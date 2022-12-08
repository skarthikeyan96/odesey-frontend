// lib/serverProps.js
import nookies  from 'nookies';
import axios from 'axios'

export default async function getServerSideProps(ctx: any) {
    const cookies = nookies.get(ctx);
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
  }