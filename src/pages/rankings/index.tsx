import Rankings from "@/components/Rankings/Rankings";
import BetsLayout from "../layout";
import { ReactNode } from "react";

export default function Home() {
  return <Rankings />;
}

Home.getLayout = (page: ReactNode) => {
  return <BetsLayout>{page}</BetsLayout>;
};
