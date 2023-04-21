module.exports = getCookies;

function getCookies() {
  const cookieString = document.cookie; // Get cookie string

  const token = cookieString
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1]; // Extract token value from cookie string
  return token;
}
