import React from "react";

type ContainerAppProps = {
  AppHome: React.LazyExoticComponent<React.ComponentType<{}>>;
  AppLogin: React.LazyExoticComponent<React.ComponentType<{}>>;
};

export const ContainerApp = ({ AppHome, AppLogin }: ContainerAppProps) => {
  return (
    <>
      <React.Suspense fallback={false}>
        <AppHome />
      </React.Suspense>
      <React.Suspense fallback={false}>
        <AppLogin />
      </React.Suspense>
    </>
  );
};
