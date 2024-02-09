import Sidebar from "@/components/Homepage/Leftbar/Sidebar";
import RightBar from "@/components/Homepage/Rightbar/RightBar";
import Navbar from "@/components/Navbar";
import RouteGuard from "@/components/auth/RouteGuard";
import MobileCouponCart from "@/components/shared/MobileCouponCart";
import { NextPage } from "next";
import { FunctionComponent, PropsWithChildren } from "react";

const BetsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <RightBar />
      {children}
      <MobileCouponCart />
    </>
  );
};
export default BetsLayout;
