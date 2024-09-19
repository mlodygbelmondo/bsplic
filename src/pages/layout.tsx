import Sidebar from "@/components/Homepage/Leftbar/Sidebar";
import RightBar from "@/components/Homepage/Rightbar/RightBar";
import MobileCouponCart from "@/components/shared/MobileCouponCart";
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
