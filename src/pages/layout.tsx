import Sidebar from "@/components/Homepage/Leftbar/Sidebar";
import RightBar from "@/components/Homepage/Rightbar/RightBar";
import MobileCouponCart from "@/components/shared/MobileCouponCart";
import { FunctionComponent, PropsWithChildren, memo, useCallback } from "react";
import { useRouter } from "next/router";

const BetsLayout: FunctionComponent<PropsWithChildren> = memo(
  ({ children }) => {
    const router = useRouter();

    const handleRouteChange = useCallback(() => {
      // Reset scroll position on route change
      window.scrollTo(0, 0);
    }, []);

    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1" onScroll={handleRouteChange}>
          {children}
        </main>
        <RightBar />
        <MobileCouponCart />
      </div>
    );
  }
);

BetsLayout.displayName = "BetsLayout";

export default BetsLayout;
