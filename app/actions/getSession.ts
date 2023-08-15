import { getServerSession } from "next-auth";
// That is why we export authOptions
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getSession() {
  return await getServerSession(authOptions);
}
