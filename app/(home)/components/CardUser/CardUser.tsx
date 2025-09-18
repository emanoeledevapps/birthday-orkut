"use client";

import { useEffect, useState } from "react";
import { ConnectedUser } from "./ConnectedUser";
import { DisconnectedUser } from "./DisconnectedUser";
import { User } from "@/app/generated/prisma";

export function CardUser() {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div className="flex flex-row gap-5 p-3 bg-white rounded-sm">
      {user ? (
        <ConnectedUser user={user} />
      ) : (
        <DisconnectedUser setUser={setUser} />
      )}
    </div>
  );
}
