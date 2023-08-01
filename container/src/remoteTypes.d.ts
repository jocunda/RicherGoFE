///<reference types="react" />

declare module "app_home/CounterAppHome" {
  const Component: React.ComponentType;
  const loader: () => {};
}

declare module "app_login/CounterAppLogin" {
  const Component: React.ComponentType;
  const loader: () => {};
}

declare module "app_login/AppRegister" {
  const Component: React.ComponentType;
  const loader: () => {};
}

declare module "app_user/AppUser" {
  const Component: React.ComponentType;
  const loader: () => {};
}
declare module "app_user/ResetPasswordForm" {
  const Component: React.ComponentType;
  const loader: () => {};
}
declare module "app_user/UserProfile" {
  const Component: React.ComponentType;
  const loader: () => {};
}
declare module "app_user/UserSetting" {
  const Component: React.ComponentType;
  const loader: () => {};
}
// declare module "app_header/Header" {
//   const Component: React.ComponentType;
//   const loader: () => {};
// }
declare module "app_items/AppItems" {
  const Component: React.ComponentType;
  const loader: () => {};
}
declare module "app_items/AppItemSingle" {
  const Component: React.ComponentType;
  const loader: () => {};
}

declare module "app_inventories/AppInventories" {
  const Component: React.ComponentType;
  const loader: () => {};
}
declare module "app_cart/AppCart" {
  const Component: React.ComponentType;
  const loader: () => {};
}

type AppHeaderProps = {
  count: number;
  onClear: () => void;
};
declare module "app_header/AppHeader" {
  const AppHeader: React.ComponentType<AppHeaderProps>;
  const loader: () => {};
}
declare module "app_errhandling/AppError" {
  const AppError: React.ComponentType;
  //export default AppError;
}
