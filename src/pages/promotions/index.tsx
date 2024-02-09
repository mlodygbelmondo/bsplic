import PromotionpageMain from "@/components/Homepage/Promotions/PromotionpageMain";
import { ReactNode } from "react";
import BetsLayout from "../layout";
export default function Home() {
  return <PromotionpageMain />;
}

Home.getLayout = (page: ReactNode) => {
  return <BetsLayout>{page}</BetsLayout>;
};
