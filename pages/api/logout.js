import { mAdmin } from "../../lib/magic-server";
import { getUserIdFromToken } from "../../lib/utils";
import { removeTokenCookie } from "../../lib/cookie";

export default async function logout(req, res) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "User is not logged in" });

    const userId = getUserIdFromToken(token);
    const cookie = removeTokenCookie();
    res.setHeader("Set-Cookie", cookie);
    try {
      await mAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.error("Error occurred while logging out magic user", error);
    }
    //redirects user to login page
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.error({ error });
    res.status(401).json({ message: "User is not logged in" });
  }
}
