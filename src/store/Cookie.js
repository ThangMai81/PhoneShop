export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    const [key, value] = c.split("=");
    console.log("value?: ", value);
    if (key === name) return value;
  }
  return null;
}
export function removeCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; Secure`;
}
