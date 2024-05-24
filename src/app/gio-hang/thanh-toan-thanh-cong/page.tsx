import { Poppins } from "next/font/google";
import cx from "classnames";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { Navbar } from "@/components/common/Navbar";

const inter = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function OrderSuccess() {
  return (
    <>
      <Navbar />
      <div className={cx(inter.className, "container w-[1400px] mx-auto my-0 relative h-[80vh]")}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
          <div className="w-[44px] h-[44px]">
            <IoIosCheckmarkCircle width={44} height={44} className="w-[44px] h-[44px] text-[#10b981]" />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold">
              Chúng tôi đã nhật được đơn đặt hàng của bạn
            </h1>
            <p className="m-2">
              Đơn hàng #2939993 đã được chuyển tới người bán hàng. Chúng tôi sẽ liên hệ lại sớm với bạn
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
