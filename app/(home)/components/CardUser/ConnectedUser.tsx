"use client";

import { createPost } from "@/app/actions";
import { User } from "@/app/generated/prisma";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Props {
  user: User;
}
export function ConnectedUser({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePost() {
    setIsLoading(true);
    const response = await createPost({
      userId: user.id,
      message,
    });

    if (response.success) {
      alert("post ok");
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="w-32 flex flex-col p-3 items-center justify-center">
        <div className="flex w-20 h-20 rounded-full bg-green-500" />
        <p className="text-center text-sm">{user.name}</p>
      </div>

      <div className="flex flex-col">
        <Label className="text-text-secondary text-sm" htmlFor="message">
          Deixe aqui sua mensagem para ANIVERSARIANTE
        </Label>
        <Input
          id="message"
          placeholder="Digite aqui"
          className="w-full h-12 rounded-sm bg-background px-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex w-full justify-end mt-3">
          <button
            className="h-10 w-20 rounded-sm text-white bg-blue-primary font-semibold"
            disabled={isLoading || !message.trim()}
            onClick={handlePost}
          >
            Publicar
          </button>
        </div>
      </div>
    </>
  );
}
