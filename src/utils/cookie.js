function setCookie(name, value) {
  const maxAge = 30 * 24 * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
}

function getCookie(name) {
  const value = `; ${document?.cookie}`;
  const parts = value?.split(`; ${name}=`);
  if (parts?.length === 2) return parts?.pop()?.split(";")?.shift();
}

function removeCookie(name) {
  document.cookie = `${name}=; max-age=0; path=/`;
}
export { setCookie, getCookie, removeCookie };
