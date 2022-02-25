import jwt from "jsonwebtoken";

export function getUserIdFromToken(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decodedToken.issuer;
}
