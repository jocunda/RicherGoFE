import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        async lazy() {
          let CounterAppHome = await import("app_home/CounterAppHome");
          return { Component: CounterAppHome.default };
        },
      },
      {
        path: "user",
        children: [
          {
            path: "",
            async lazy() {
              let AppUser = await import("app_user/AppUser");
              return { Component: AppUser.default };
            },
          },
          {
            path: "reset",
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
