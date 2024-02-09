export const getCookie = (cookieName: string) => {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

type SetCookieParams = {
  cookieName: string;
  cookieValue: string;
  expires_in_days?: number;
  path?: string;
};

export const setCookie = ({
  cookieName,
  cookieValue,
  expires_in_days = 365,
  path = "/",
}: SetCookieParams) => {
  const d = new Date();
  d.setTime(d.getTime() + expires_in_days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();

  const cookieExpires = expires_in_days ? `;expires=${expires}` : "";
  const cookiePath = path ? `;path=${path}` : "";

  document.cookie = cookieName + "=" + cookieValue + cookieExpires + cookiePath;
};
