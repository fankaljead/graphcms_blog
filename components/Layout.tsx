import React from "react";

import { Header } from "./";

interface IProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
