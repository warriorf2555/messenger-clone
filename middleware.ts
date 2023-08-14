import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  // Protect all route matching the path
  matcher: ["/users/:path*"],
};
