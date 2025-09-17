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

interface Props {
  setUser: (user: User) => void;
}
export function ConnectUser({ setUser }: Props) {
  const { randomUUID } = new ShortUniqueId({ length: 8 });
  const accessCode = useMemo(() => randomUUID().toUpperCase(), []);

  const [name, setName] = useState("");

  async function teste() {
    if (!name.trim()) return;

    const response = await createUser({
      id: accessCode,
      name,
    });

    if (response.success) {
      navigator.clipboard.writeText(accessCode);
      if (response.user) {
        localStorage.setItem("user-connected", JSON.stringify(response?.user));
        setUser(response.user);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="h-10 px-10 rounded-sm text-white font-semibold bg-blue-primary">
        Conectar
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vamos conectar</DialogTitle>
          <DialogDescription>
            É bem rápido, precisamos apenas do seu nome
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="grid flex-1">
            <Label className="text-text-secondary">Seu código de acesso</Label>
            <p className="font-bold text-2xl text-blue-primary">{accessCode}</p>
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

          <Button className="mt-5" onClick={teste}>
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
