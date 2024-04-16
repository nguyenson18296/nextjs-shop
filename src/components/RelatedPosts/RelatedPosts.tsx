'use client'
import { BASE_URL } from '@/constants';
import React, { useCallback, useEffect, useState } from 'react';

import { RelatedPostItem } from './RelatedPostItem';

export interface IProductDetail {
  id: number;
  title: string;
  short_description: string;
  seo_title: string;
  seo_description: string;
  cover_photo: string;
  content: string;
  slug: string;
  user: {
    username: string;
    avatar: string;
  }
}

export const RelatedPosts: React.FC = () => {
  const [posts, setPosts] = useState<IProductDetail[]>([]);

  const getRandomPosts = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/posts/random`);
    const data = await response.json();
    setPosts(data.data);
  }, []);

  useEffect(() => {
    getRandomPosts();
  }, [getRandomPosts]);

  console.log("posts", posts);

  return (
    <div className='mx-auto w-full max-w-w1336 pb-10'>
      <h2 className='px-4 py-4 text-2xl color-[#141414] font-semibold'>
        Related Posts
      </h2>
      <div className='grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {posts.map(post => (
          <RelatedPostItem
            key={post.id}
            cover_photo={post.cover_photo}
            short_description={post.short_description}
            title={post.title}
            slug={post.slug}
            user={post.user}
          />
        ))}
      </div>
    </div>
  )
}