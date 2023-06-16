import { redirect } from "react-router-dom";
import type { Response } from "./types";

export function getToken() {
  const cookieString = document.cookie; // Get cookie string
  console.log(cookieString);
  // const token = cookieString
  //   .split(";")
  //   .map((cookie) => cookie.trim())
  //   .find((cookie) => cookie.startsWith("token="))
  //   ?.split("=")[1]; // Extract token value from cookie string
  // console.log(token);
  // debugger;
  return cookieString;
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
    const user = sessionStorage.getItem("user");

    // Exclude /login path from being recorded as last visited page
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath === "/login";

    //save user last path in session
    sessionStorage.setItem("lastVisitedPage", currentPath);

    // const data = localStorage.getItem("user");
    if (!user && !isLoginPage) {
      return redirect("/login");
    }

    const loaderData = await loader();

    return { user, ...loaderData };
  };
}

async function request<T>(
  url: string,
  method: RequestInit["method"],
  requestPayload?: any,
  config?: RequestInit
): Promise<Response<T>> {
  try {
    // const token = getToken();
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // ...(token && { Authorization: `Bearer ${token}` }),
      },
      method,
      ...(requestPayload && { body: JSON.stringify(requestPayload) }),
      ...config,
    });

    if (response.status === 200) {
      const data = (await response.json()) as T;
      return {
        data,
      };
    } else {
      const errorMessage = (await response.json()) as string;
      return {
        error: response.status,
        errorMessage,
      };
    }
  } catch (error) {
    return {
      error: -1,
      errorMessage: error.toString(),
    };
  }
}

export const api = {
  get: <ResponseData>(url: string) => request<ResponseData>(url, "GET"),
  post: <ResponseData>(url: string, requestPayload: any) =>
    request<ResponseData>(url, "POST", requestPayload),
  put: <ResponseData>(url: string, requestPayload: any) =>
    request<ResponseData>(url, "PUT", requestPayload),
  batch: <ResponseData>(url: string, requestPayload: any) =>
    request<ResponseData>(url, "BATCH", requestPayload),
  delete: <ResponseData>(url: string) => request<ResponseData>(url, "DELETE"),
};
