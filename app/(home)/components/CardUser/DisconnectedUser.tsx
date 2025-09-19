"use client";

import { useMemo, useState } from "react";
import ShortUniqueId from "short-unique-id";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/app/actions";
import { User } from "@/app/generated/prisma";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  setUser: (user: User) => void;
}
export function DisconnectedUser({ setUser }: Props) {
  const personName = process.env.NEXT_PUBLIC_BIRTHDAY_PERSON;
  const { randomUUID } = new ShortUniqueId({ length: 8 });
  const accessCode = useMemo(() => randomUUID().toUpperCase(), []);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function teste() {
    if (!name.trim()) return;

    setIsLoading(true);
    const response = await createUser({
      id: accessCode,
      name,
    });

    if (response.success) {
      if (navigator) {
        navigator?.clipboard?.writeText(accessCode);
      }
      if (response.user) {
        localStorage.setItem("user-connected", JSON.stringify(response?.user));
        setUser(response.user);
      }
    }
    setIsLoading(false);
  }

  return (
    <Dialog>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-blue-primary">
          Você não está conectado!
        </p>
        <p className="text-text-secondary text-sm">
          Conecte-se para deixar seu recado para {personName}, postar suas fotos
          e comemorar juntos esse momento
        </p>
        <DialogTrigger className="h-10 px-10 rounded-sm text-white font-semibold bg-blue-primary mt-5">
          Conectar
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vamos conectar</DialogTitle>
          <DialogDescription>
            É bem rápido, precisamos apenas do seu nome
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="grid flex-1">
            <Label className="text-text-secondary">Seu código de acesso</Label>
            <p className="font-bold text-3xl text-blue-primary">{accessCode}</p>

            <p className="text-xs">
              Esse código de acesso será copiada para sua área de transferência
              caso precise, mas não se preocupe, você ficará conectado nesse
              dispositivo
            </p>
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="name" className="text-text-secondary">
              Digite seu nome
            </Label>
            <Input
              id="name"
              placeholder="Digite aqui"
              className="bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button
            className="mt-5 hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
            onClick={teste}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters
                className="animate-spin text-white"
                size={20}
              />
            ) : (
              "Continuar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
