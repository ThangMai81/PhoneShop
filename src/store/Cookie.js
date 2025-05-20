export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    console.log("eachCookie: ", c);
    const [key, ...rest] = c.split("=");
    const value = rest.join("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}
export function removeCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=None; Secure`;
}
