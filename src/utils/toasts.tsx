import type { toastType } from "./toastMessages";
import Image from "next/image";
import toast from "react-hot-toast";

export const createToast = (toastData: {
  message: string;
  type: keyof typeof toastType;
  duration?: number;
}) =>
  toast.custom(
    (t) => (
      <div
        className={`flex w-auto items-center justify-center gap-2 rounded bg-[#1b1b1b] py-3 px-3 md:px-5 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <Image
          height={18}
          width={18}
          src={`/icons/${toastData.type}-circle.svg`}
          alt={`${toastData.type} icon`}
        />
        <p className="text-white">{toastData.message}</p>
      </div>
    ),
    { duration: toastData.duration || 3500 }
  );
