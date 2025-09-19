"use client";

import { useEffect, useState } from "react";
import { ConnectedUser } from "./ConnectedUser";
import { DisconnectedUser } from "./DisconnectedUser";
import { Prisma, User } from "@/app/generated/prisma";
import { Post } from "@/components/Post/Post";

type PostProps = Prisma.PostGetPayload<{
  include: { user: true; photos: true };
}>;
export function CardUser() {
  const [user, setUser] = useState<User | null>(null);
  const [lastPostCreated, setLastPostCreated] = useState<PostProps | null>(
    null
  );

  useEffect(() => {
    checkUserConnected();
  }, []);

  async function checkUserConnected() {
    const response = await localStorage.getItem("user-connected");

    if (response) {
      setUser(JSON.parse(response) as User);
    } else {
      setUser(null);
    }
  }

  async function saveUser(user: User) {
    await localStorage.setItem("user-connected", JSON.stringify(user));
    setUser(user);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-5 p-3 bg-white rounded-sm">
        {user ? (
          <ConnectedUser
            user={user}
            createdPost={setLastPostCreated}
            updateUser={saveUser}
          />
        ) : (
          <DisconnectedUser setUser={setUser} />
        )}
      </div>

      {lastPostCreated && (
        <div className="flex flex-col gap-1">
          <p className="text-text-secondary text-xs">Seu último post</p>
          <Post post={lastPostCreated} />
        </div>
      )}
    </div>
  );
}
