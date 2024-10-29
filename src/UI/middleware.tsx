/* import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("nextauth.message")?.value; // Updated to safely access cookie value
  console.log("Token from cookie:", token); // Debugging output

  if (!token) {
    console.log("No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/my-bookings/:path*"], // Ensure it matches nested routes under `/my-bookings`
}; */

/* import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("nextauth.message");  accessToken 
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
};

export const config = { matcher: ["/dashboard", "/gallery"] };
 */
