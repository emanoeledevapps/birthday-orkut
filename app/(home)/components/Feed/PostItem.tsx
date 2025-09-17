import { Post } from "@/app/generated/prisma";

interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  return (
    <div className="flex flex-col w-full p-5 bg-white">
      <p className="text-black">{post.message}</p>
    </div>
  );
}
