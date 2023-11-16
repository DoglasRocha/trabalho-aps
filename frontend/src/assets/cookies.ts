import { Cookies } from "react-cookie";

export const cookies = new Cookies();

export function getCookie() {
  const cookie = cookies.get("dadosUsuario");
  if (!cookie) return;
  const semiParsedCookie = cookie.replace(/[']/g, '"').replace(/(\\054)/g, ",");
  const userData = JSON.parse(semiParsedCookie);
  return userData;
}

export function apagarCookie() {
  cookies.remove("dadosUsuario");
}
