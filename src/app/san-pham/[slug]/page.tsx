import { Poppins } from "next/font/google";

import { ProductDetail } from "@/components/ProductDetail/ProductDetail"

import { BASE_URL } from "@/constants"

interface IPage {
    params: {
        slug: string;
    }
}

const inter = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
  });

export default async function Page({ params: { slug } }: IPage) {
    const item = await getData(slug)

    return (
        <div className={inter.className}>
            <ProductDetail product={item?.data} />
        </div>
    )
}

async function getData(slug: string) {
    const res = await fetch(`${BASE_URL}/products/${slug}`, {
        cache: 'no-store'
    })
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }