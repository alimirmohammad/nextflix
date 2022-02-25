import cookie from "cookie";

const MAX_AGE = 7 * 24 * 60 * 60;

export function setTokenCookie(token) {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return setCookie;
}

export function removeTokenCookie() {
  const setCookie = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });

  return setCookie;
}
