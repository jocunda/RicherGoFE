import { redirect } from "react-router-dom";
import { isLoggedIn } from "@mimo/api";

export function getToken() {
  const cookieString = document.cookie; // Get cookie string

  const token = cookieString
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1]; // Extract token value from cookie string
  return token;
}

export function createLoader(remoteEntry: () => Promise<any>) {
  return async function () {
    let { loader } = await remoteEntry();
    return await loader();
  };
}

export function createProtectedLoader(remoteEntry: () => Promise<any>) {
  return async function () {
    let { loader } = await remoteEntry();
    const { user } = await isLoggedIn();

    // Exclude /login path from being recorded as last visited page
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === "/login";

    if (!user && !isLoginPage) {
      //TODO:get item
      //save user last path in session
      //sessionStorage.setItem("lastVisitedPage", currentPath);
      // return redirect(`/login?next=${currentPath}`);
      return redirect("/login");
    }

    const data = await loader();

    return { ...user, ...data };
  };
}
