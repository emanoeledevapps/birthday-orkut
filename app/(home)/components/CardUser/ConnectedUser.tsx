"use client";

import { createPost } from "@/app/actions";
import { User } from "@/app/generated/prisma";
import { Avatar } from "@/components/Avatar/Avatar";
//import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  user: User;
}
export function ConnectedUser({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePost() {
    setIsLoading(true);
    const response = await createPost({
      userId: user.id,
      message,
    });

    if (response.success) {
      setMessage("");
      router.refresh();
    } else {
      // TODO: add alert
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full flex flex-col gap-2">
        <p className="text-text-secondary text-sm">
          Você está conectado(a) como
        </p>

        <div className="flex gap-3">
          <Avatar
            name={user.name}
            imageUrl={user?.profilePhoto ? user?.profilePhoto : ""}
          />

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-blue-primary text-lg">
              {user.name}
            </p>

            {/* <div className="flex items-center gap-5">
              <Button className="text-xs">Seus depoimentos</Button>
              <Button className="text-xs">Atualizar foto</Button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Label className="text-text-secondary text-xs" htmlFor="message">
          Deixe aqui sua mensagem, ou poste seu momento
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
            className="h-10 w-24 flex items-center justify-center rounded-sm text-white bg-blue-primary font-semibold hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
            disabled={isLoading || !message.trim()}
            onClick={handlePost}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white"
                size={20}
              />
            ) : (
              "Publicar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
