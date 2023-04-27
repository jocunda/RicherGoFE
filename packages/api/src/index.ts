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
  return { user: undefined };
}

export function authLogin(e: React.FormEvent<HTMLFormElement>) {
  // Read the form data
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  // Or you can work with it as a plain object:
  const formJson = Object.fromEntries(formData.entries());

  fetch("/api/Authenticate/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: form.method,
    body: JSON.stringify(formJson),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        return response.json();
      } else {
        throw new Error(`Error ${response.status} ${response.statusText}`);
      }
    })
    .then(({ token, expiration }) => {
      if (token && expiration) {
        // Convert expiration date to a Date object
        const expirationDate = new Date(expiration);

        // Convert expiration date to UTC string
        const expirationString = expirationDate.toUTCString();
        // Set cookie with token and expiration
        document.cookie = `token=${token}; expires=${expirationString}; path=/;`;
        alert("Welcome back in. Authenticating...");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
