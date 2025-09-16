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

export function ConnectUser() {
  return (
    <Dialog>
      <DialogTrigger className="h-10 px-10 rounded-sm text-white font-semibold bg-blue-primary">
        Conectar
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vamos conectar</DialogTitle>
          <DialogDescription>
            É bem rápido, vamos usar seu email
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email" className="text-text-secondary">
              Digite seu email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite aqui"
              className="bg-white"
            />
          </div>

          <Button className="mt-5">Continuar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
