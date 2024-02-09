import LivepageMain from "@/components/Homepage/Live/LivepageMain";
import { ReactNode } from "react";
import BetsLayout from "../layout";
export default function Home() {
  return <LivepageMain />;
}

Home.getLayout = (page: ReactNode) => {
  return <BetsLayout>{page}</BetsLayout>;
};
