import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_KEY = process.env.JWT_KEY as string;

export async function verify(token: string, secret: string): Promise<any> {
  const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}

export default async function middleware(req: NextRequest) {
  const url = req.url;
  const { pathname } = req.nextUrl;
  const jwt: any = req.cookies.get("jwt");

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") // exclude all files in the public folder
  )
    return NextResponse.next();

if ((/\/admin\/.*/gim).test(pathname)) {
    // anything present under the admin route is private
    if (jwt === undefined) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }

    try {
       await verify(jwt.value, JWT_KEY );
      return NextResponse.next();
    } catch (error) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }
  }

  return NextResponse.next();
}
