/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Post as PostProps } from "@/app/generated/prisma";
import { Avatar } from "@/components/Avatar/Avatar";
import { useTimeSince } from "@/hooks/useTimeSince";
import Image from "next/image";

interface Props {
  post: PostProps;
}

export function Post({ post }: Props) {
  const { formatted } = useTimeSince(post.createdAt);

  return (
    <div className="flex flex-col w-full p-5 bg-white rounded-sm gap-2">
      <div className="flex gap-3">
        <Avatar
          //@ts-ignore
          name={post?.user?.name}
          //@ts-ignore
          imageUrl={post?.user?.profilePhoto}
          size={50}
        />

        <div className="flex flex-col">
          <p className="text-blue-primary font-semibold text-lg">
            {/* @ts-ignore */}
            {post?.user?.name}
          </p>
          <p className="text-text-secondary text-sm">{formatted}</p>
        </div>
      </div>
      <p className="text-black">{post.message}</p>
      {/* @ts-ignore */}
      {post?.photos?.length > 0 && (
        <Image
          width={300}
          height={300}
          className="w-full h-[300px] object-cover"
          //@ts-ignore
          src={post?.photos?.[0]?.url}
          alt="photo item"
        />
      )}
    </div>
  );
}
