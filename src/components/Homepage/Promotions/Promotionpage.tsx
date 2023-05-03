import Sidebar from "../Leftbar/Sidebar";
import PromotionpageMain from "./PromotionpageMain";
import RightBar from "../Rightbar/RightBar";

const Promotionpage = () => {
  return (
    <div className="promotionpage">
      <Sidebar />
      <PromotionpageMain />
      <RightBar setIsCouponOpen={() => {}} isCouponOpen={false} />
    </div>
  );
};

export default Promotionpage;
