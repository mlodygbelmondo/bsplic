import Sidebar from "../Leftbar/Sidebar";
import LivepageMain from "./LivepageMain";
import RightBar from "../Rightbar/RightBar";

const Livepage = () => {
  return (
    <div className="livepage">
      <Sidebar />
      <LivepageMain />
      <RightBar setIsCouponOpen={() => {}} isCouponOpen={false} />
    </div>
  );
};

export default Livepage;
