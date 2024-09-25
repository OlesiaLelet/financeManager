import React from "react";
import { useAppSelector } from "../redux/store";
import { Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const isLog = useAppSelector((state) => state.authorization.isRegister);

  return <>{!isLog ? "" : <Outlet />}</>;
}
