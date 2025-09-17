"use client";

import { useEffect, useState } from "react";
import { UserProps } from "@/types/user";
import { ConnectedUser } from "./ConnectedUser";
import { ConnectUser } from "./ConnectUser";

export function CardUser() {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    checkUserConnected();
  }, []);

  async function checkUserConnected() {
    const response = await localStorage.getItem("user-connected");

    if (response) {
      setUser(JSON.parse(response));
    } else {
      setUser(null);
    }
  }

  return (
    <div className="flex flex-row gap-5 p-3 bg-white rounded-sm">
      {user ? <ConnectedUser user={user} /> : <ConnectUser />}
    </div>
  );
}
