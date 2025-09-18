"use client";

import { useEffect, useRef, useState } from "react";

import { Post as PostProps } from "@/app/generated/prisma";
import { getPosts } from "@/app/actions";
import { Post } from "@/components/Post/Post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Feed() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listEnd = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    if (listEnd.current) {
      observer.observe(listEnd.current);
    }

    return () => {
      if (listEnd.current) observer.unobserve(listEnd.current);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 1) return;
    fetchPosts(page);
  }, [page]);

  if (loading && posts.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
        <AiOutlineLoading3Quarters
          size={30}
          className="text-blue-primary animate-spin"
        />
        <p className="text-blue-primary font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between w-full">
        <p className="text-text-secondary text-xs">Depoimentos</p>
      </div>
      {posts.map((item) => (
        <Post post={item} key={item.id} />
      ))}

      <div ref={listEnd} />
    </div>
  );
}
