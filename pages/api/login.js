import { mAdmin } from "../../lib/magic-server";
import jwt from "jsonwebtoken";
import { setTokenCookie } from "../../lib/cookie";
import { createNewUserMutation, isNewUserQuery } from "../../lib/hasura";

export default async function login(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: "Unsupported method." });
  }
  try {
    const didToken = mAdmin.utils.parseAuthorizationHeader(
      req.headers.authorization
    );
    const metadata = await mAdmin.users.getMetadataByToken(didToken);
    const token = jwt.sign(
      {
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["admin", "user"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": metadata.issuer,
        },
      },
      process.env.JWT_SECRET_KEY
    );
    const isNewUser = await isNewUserQuery(metadata.issuer, token);
    if (isNewUser) {
      await createNewUserMutation(metadata, token);
    }
    const cookie = setTokenCookie(token);
    res.setHeader("Set-Cookie", cookie);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ message: "Something went wrong logging in!" });
  }
}
