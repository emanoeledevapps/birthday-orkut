/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, ReactNode, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

export interface PhotoProps {
  file: File;
  preview: string;
}
interface Props {
  children: ReactNode;
  onChangePhoto: (photo: PhotoProps) => void;
}
export function AddPhoto({ children, onChangePhoto }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleUseCam() {
    const camInput = document?.querySelector("#cam-input");
    if (!camInput) return;
    //@ts-ignore
    camInput.click();
  }

  function handleUseGallery() {
    const camInput = document?.querySelector("#gallery-input");
    if (!camInput) return;
    //@ts-ignore
    camInput.click();
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    onChangePhoto({
      preview,
      file,
    });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar imagem</DialogTitle>
          <DialogDescription>Escolha a origem da imagem</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-5">
          <input
            id="cam-input"
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="w-32 h-32 flex flex-col items-center justify-center text-white gap-2 bg-blue-primary font-semibold rounded-sm"
            onClick={handleUseCam}
          >
            <FaCamera size={30} />
            Usar câmera
          </button>

          <input
            id="gallery-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="w-32 h-32 flex flex-col items-center justify-center text-white gap-2 bg-blue-primary font-semibold rounded-sm"
            onClick={handleUseGallery}
          >
            <GrGallery size={30} />
            Escolher dos arquivos
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
