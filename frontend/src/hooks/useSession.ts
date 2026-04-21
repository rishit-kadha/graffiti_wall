import { v4 as uuidv4 } from "uuid";
import { useCookies } from "react-cookie";

export function setSessionId() {
  const [cookies, setCookie, removeCookie] = useCookies(["graffiti-session"]);
  if (!cookies["graffiti-session"]) {
    const newSessionId = uuidv4();
    setCookie("graffiti-session", newSessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
}
export function getSessionId() {
  const [cookies] = useCookies(["graffiti-session"]);
  return cookies["graffiti-session"] || null;
}
export function clearSessionId() {
  const [, , removeCookie] = useCookies(["graffiti-session"]);
  removeCookie("graffiti-session", { path: "/" });
}
