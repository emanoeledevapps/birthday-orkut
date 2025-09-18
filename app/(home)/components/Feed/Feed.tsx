"use client";

import { useEffect, useRef, useState } from "react";

import { Post as PostProps } from "@/app/generated/prisma";
import { getPosts } from "@/app/actions";
import { Post } from "@/components/Post/Post";

export function Feed() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  async function fetchPosts(pageNumber: number) {
    setLoading(true);
    const response = await getPosts({ page: pageNumber });

    if (response.success) {
      if (response.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...response.posts]);
      }
    } else {
      // TODO: alert error
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts(page);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {posts.map((item) => (
        <Post post={item} key={item.id} />
      ))}
    </div>
  );
}
