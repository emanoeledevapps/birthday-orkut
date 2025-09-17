import { User } from "@/app/generated/prisma";

interface Props {
  user: User;
}
export function ConnectedUser({ user }: Props) {
  return (
    <>
      <div className="w-32 flex flex-col p-3 items-center justify-center">
        <div className="flex w-20 h-20 rounded-full bg-green-500" />
        <p className="text-center text-sm">{user.name}</p>
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
    </>
  );
}
