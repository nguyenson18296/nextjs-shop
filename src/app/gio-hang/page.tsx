import { Poppins } from "next/font/google";
import cx from "classnames";
import { cookies } from "next/headers";

import { Navbar } from "@/components/common/Navbar";
import { BASE_URL } from "@/constants";
import { CartWrapper } from "@/components/Cart/CartWrapper";

const inter = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Cart() {
  const cart = await getData();

  return (
    <>
      <Navbar />
      <div className={cx(inter.className, "container w-[1200px] mx-auto my-0")}>
        <CartWrapper carts={cart.data.items} />
      </div>
    </>
  );
}

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
