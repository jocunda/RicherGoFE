import { createBrowserRouter, redirect } from "react-router-dom";

function getUser() {
  const cookieString = document.cookie; // Get cookie string

  const token = cookieString
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1]; // Extract token value from cookie string
  return token;
}

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        loader: async () => {
          const user = await getUser();
          if (!user) {
            return redirect("/login");
          }
          return null;
        },
        lazy: () =>
          import("app_home/CounterAppHome").then((module) => ({
            Component: module.default,
          })),
        // async lazy() {
        //   let CounterAppHome = await import("app_home/CounterAppHome");
        //   return { Component: CounterAppHome.default };
        // },
      },
      {
        path: "user",
        children: [
          {
            path: "",
            loader: async () => {
              const user = await getUser();
              if (!user) {
                return redirect("/login");
              }
              return null;
            },
            async lazy() {
              let AppUser = await import("app_user/AppUser");
              return { Component: AppUser.default };
            },
          },
          {
            path: "reset",
            loader: async () => {
              const user = await getUser();
              if (!user) {
                return redirect("/login");
              }
              return null;
            },
            async lazy() {
              let ResetPasswordForm = await import(
                "app_user/ResetPasswordForm"
              );
              return { Component: ResetPasswordForm.default };
            },
          },
        ],
      },
      {
        path: "login",
        async lazy() {
          let CounterAppLogin = await import("app_login/CounterAppLogin");
          return { Component: CounterAppLogin.default };
        },
      },
    ],
  },
]);

export { router };
