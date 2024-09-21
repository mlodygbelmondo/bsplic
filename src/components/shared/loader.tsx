import type { FunctionComponent } from "react";
import Lottie, { Options } from "react-lottie";
import loaderAnimation from "../../assets/lottie/loader-animation.json";

type Props = {
  height?: number;
  width?: number;
};

const Component: FunctionComponent<Props> = ({ height = 32, width = 32 }) => {
  const options: Options = {
    autoplay: true,
    loop: true,
    animationData: loaderAnimation,
  };

  return <Lottie options={options} height={height} width={width} />;
};

export default Component;
