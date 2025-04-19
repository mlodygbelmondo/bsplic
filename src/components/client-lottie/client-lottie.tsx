// components/ClientLottie.ts
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Options, LottieProps } from "react-lottie";

// dynamically import react-lottie—never on the server
const Lottie = dynamic<LottieProps>(
  () => import("react-lottie").then((mod) => mod.default),
  { ssr: false }
);

export type { Options };
export default Lottie as ComponentType<LottieProps>;
