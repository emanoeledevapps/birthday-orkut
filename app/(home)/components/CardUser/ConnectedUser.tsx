"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { createPost } from "@/app/actions";
import { Post, User } from "@/app/generated/prisma";
import { Avatar } from "@/components/Avatar/Avatar";
//import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrGallery } from "react-icons/gr";
import { AddPhoto, PhotoProps } from "@/components/AddPhoto/AddPhoto";
import Image from "next/image";

interface PhotoItemProps {
  photo: PhotoProps;
}
function PhotoItem({ photo }: PhotoItemProps) {
  return (
    <div className="flex">
      <Image
        width={50}
        height={50}
        src={photo.preview}
        alt="Imagem para upload"
        className="w-20 h-20 object-cover rounded-sm"
      />
    </div>
  );
}

interface Props {
  user: User;
  createdPost: (post: Post) => void;
}
export function ConnectedUser({ user, createdPost }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAddImages, setShowAddImages] = useState(false);
  const [photosToUpload, setPhotosToUpload] = useState<PhotoProps[]>([]);

  async function handlePost() {
    setIsLoading(true);
    const response = await createPost({
      userId: user.id,
      message,
    });

    if (response.success) {
      setMessage("");
      toast.success("Depoimento publicado com sucesso!");
      if (response.post) createdPost(response.post);
    } else {
      toast.error("Algo deu errado, tente novamente!");
    }
    setIsLoading(false);
  }

  function handleAddPhotoToUpload(photo: PhotoProps) {
    setPhotosToUpload((prev) => [...prev, photo]);
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

        <button onClick={() => setShowAddImages(true)} className="mt-3">
          <GrGallery className="text-blue-primary" size={25} />
        </button>

        {showAddImages && (
          <div className="flex gap-3 mt-3">
            {photosToUpload.map((item) => (
              <PhotoItem key={item.preview} photo={item} />
            ))}
            <AddPhoto onChangePhoto={handleAddPhotoToUpload}>
              <div className="w-20 h-20 rounded-sm bg-gray-400 flex flex-col items-center justify-center">
                <p className="text-xs text-center">Toque para adicionar</p>
              </div>
            </AddPhoto>
          </div>
        )}
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
