import { getToken } from "@mimo/utilities";
import { redirect } from "react-router-dom";

async function isLoggedIn() {
  const response = await fetch("/api/Authenticate/userName", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.ok) {
    const { userName } = await response.json();
    return { user: userName };
  }
  // TODO: if response is not 401, should show error like 504 Gateway Timeout

  return { user: undefined };
}

export function createProtectedLoader(remoteEntry: () => Promise<any>) {
  return async function () {
    let { loader } = await remoteEntry();

    const { user } = await isLoggedIn();
    if (!user) {
      return redirect("/login");
    }

    const data = await loader();

    return { ...user, ...data };
  };
}

export function createLoader(remoteEntry: () => Promise<any>) {
  return async function () {
    let { loader } = await remoteEntry();
    return await loader();
  };
}
