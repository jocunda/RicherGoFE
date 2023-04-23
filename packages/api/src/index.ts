import { getToken } from "@mimo/utilities";

export async function isLoggedIn() {
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
