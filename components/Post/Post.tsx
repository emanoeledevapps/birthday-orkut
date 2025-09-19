import { Prisma } from "@/app/generated/prisma";
import { Avatar } from "@/components/Avatar/Avatar";
import { useTimeSince } from "@/hooks/useTimeSince";
import { Photos } from "./Photos";

interface Props {
  post: PostProps;
}

type PostProps = Prisma.PostGetPayload<{
  include: { user: true; photos: true };
}>;

export function Post({ post }: Props) {
  const { formatted } = useTimeSince(post.createdAt);

  return (
    <div className="flex flex-col w-full bg-white rounded-sm gap-2 pb-5">
      <div className="flex gap-3 pt-5 px-5 pb-1">
        <Avatar
          name={post?.user?.name}
          imageUrl={
            post?.user?.profilePhoto ? post?.user?.profilePhoto : undefined
          }
          size={50}
        />

        <div className="flex flex-col">
          <p className="text-blue-primary font-semibold text-lg">
            {post?.user?.name}
          </p>
          <p className="text-text-secondary text-sm">{formatted}</p>
        </div>
      </div>
      <p className="text-black px-5">{post.message}</p>
      {post?.photos?.length > 0 && <Photos photos={post.photos} />}
    </div>
  );
}
