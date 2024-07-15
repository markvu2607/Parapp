import React, { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen flex justify-center items-center">{children}</div>
  );
};

export default AuthLayout;
