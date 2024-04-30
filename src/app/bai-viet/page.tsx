import { Poppins } from "next/font/google";

import { BASE_URL } from "@/constants";
import { PostItem } from './PostItem';
import { Navbar } from "@/components/common/Navbar";
import { Headline } from "@/components/Posts/Headline/Headline";

const inter = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Page() {
  const items = await getData();

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto max-w-[1280px]">
        <Headline posts={items} />
        <div className={`${inter.className} py-10 px-24`}>
          {items.map((post: any) => (
            <PostItem
              key={post.id}
              title={post.title}
              slug={post.slug}
              short_description={post.short_description}
              created_at={post.created_at}
              cover_photo={post.cover_photo}
              user={post.user}
            />
          ))}
        </div>
      </div>
    </>
  )
}

async function getData() {
  const res = await fetch(`${BASE_URL}/posts`, {
    cache: 'no-cache'
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}