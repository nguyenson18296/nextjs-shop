import { Poppins } from "next/font/google";

import { Navbar } from "@/components/common/Navbar";
import { BASE_URL } from "@/constants";
import { IPostItem } from "@/libs/store/postsSlice";
import { IUser } from "@/types/users.type";
import { UserPostHeader } from "@/components/Posts/User/UserPostHeader";
import { UserPostsList } from "@/components/Posts/User/UserPostsList";

const inter = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface IUserPostsParams {
  params: {
    username: string;
  }
}

interface IUserPostsResponse {
  data: IPostItem[];
  user: IUser;
}

export default async function Page({ params: { username } }: IUserPostsParams) {
  const posts = (await getData(username) as IUserPostsResponse);

  return (
    <>
      <Navbar />
      <div className={inter.className}>
        <UserPostHeader
          id={posts.user.id}
          email={posts.user.email}
          username={posts.user.username} 
          avatar={posts.user.avatar}
        />
        <UserPostsList username={posts.user.username} posts={posts.data} />
      </div>
    </>
  )
}

async function getData(username: string) {
  const res = await fetch(`${BASE_URL}/posts/username/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}