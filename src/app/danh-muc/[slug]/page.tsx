import { Poppins } from "next/font/google";

import { BASE_URL } from "@/constants";

const inter = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface IProducts {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug } }: IProducts) {
  const items = await getData(slug);

  return <div className={inter.className}></div>;
}

async function getData(slug: string) {
  const res = await fetch(`${BASE_URL}/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
