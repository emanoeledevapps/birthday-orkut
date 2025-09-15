"use client";

import { useState } from "react";

export function CardUser() {
  const [user, setUser] = useState();
  return (
    <div className="flex flex-row gap-5 p-3 bg-white rounded-sm">
      <div className="w-32 flex flex-col p-3 items-center justify-center">
        <div className="flex w-20 h-20 rounded-full bg-green-500" />
        <p>João da Silva</p>
      </div>

      <div className="flex flex-col">
        <label className="text-text-secondary text-sm">
          Deixe aqui sua mensagem para ANIVERSARIANTE
        </label>
        <input
          placeholder="Digite aqui"
          className="w-full h-12 rounded-sm bg-background px-3"
        />
        <div className="flex w-full justify-end mt-3">
          <button className="h-10 w-20 rounded-sm text-white bg-blue-primary font-semibold">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
