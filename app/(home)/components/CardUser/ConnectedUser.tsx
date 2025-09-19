"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { createPost, updateProfilePhoto } from "@/app/actions";
import { Prisma, User } from "@/app/generated/prisma";
import { Avatar } from "@/components/Avatar/Avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrGallery } from "react-icons/gr";
import { AddPhoto, PhotoProps } from "@/components/AddPhoto/AddPhoto";
import Image from "next/image";
import { uploadFile } from "@/sevices/uploadFile";

type PostProps = Prisma.PostGetPayload<{
  include: { user: true; photos: true };
}>;

interface PhotoItemProps {
  photo: PhotoProps;
}
function PhotoItem({ photo }: PhotoItemProps) {
  return (
    <div className="flex min-w-20">
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
  createdPost: (post: PostProps) => void;
  updateUser: (user: User) => void;
}
export function ConnectedUser({ user, createdPost, updateUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAddImages, setShowAddImages] = useState(false);
  const [photosToUpload, setPhotosToUpload] = useState<PhotoProps[]>([]);

  async function handlePost() {
    setIsLoading(true);

    const photos: { url: string }[] = [];

    if (photosToUpload.length > 0) {
      for (let i = 0; i < photosToUpload.length; i++) {
        const photo = photosToUpload[i];
        const url = await uploadFile(photo.file);
        if (url.success) {
          photos.push({
            url: url.url,
          });
        }
      }
    }

    const response = await createPost({
      userId: user.id,
      message,
      photos,
    });

    if (response.success) {
      setMessage("");
      toast.success("Depoimento publicado com sucesso!");
      if (response.post) createdPost(response.post);
      handleRemovePhotos();
    } else {
      toast.error("Algo deu errado, tente novamente!");
    }
    setIsLoading(false);
  }

  function handleAddPhotoToUpload(photo: PhotoProps) {
    setPhotosToUpload((prev) => [...prev, photo]);
  }

  function handleRemovePhotos() {
    setPhotosToUpload([]);
    setShowAddImages(false);
  }

  async function handleUpdateProfilePhoto(photo: PhotoProps) {
    const upload = await uploadFile(photo.file);

    if (upload.success) {
      const update = await updateProfilePhoto({
        userId: user.id,
        profilePhotoUrl: upload.url,
      });

      if (update.success) {
        toast.success("Foto de perfil atualizada com sucesso!");
        if (update.user) updateUser(update.user);
      } else {
        toast.error("Algo deu errado, tente novamente!");
      }
    } else {
      toast.error("Algo deu errado, tente novamente!");
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full flex flex-col gap-2">
        <p className="text-text-secondary text-xs">
          Você está conectado(a) como
        </p>

        <div className="flex gap-3">
          <Avatar
            name={user.name}
            imageUrl={user?.profilePhoto ? user?.profilePhoto : ""}
            size={70}
          />

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-blue-primary text-lg">
              {user.name}
            </p>

            <div className="flex items-center gap-5">
              <AddPhoto onChangePhoto={handleUpdateProfilePhoto}>
                <div className="flex items-center justify-center gap-1 bg-blue-primary w-32 h-8 rounded-sm">
                  <p className="text-xs text-white">Atualizar foto</p>
                </div>
              </AddPhoto>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <Label className="text-text-secondary text-xs" htmlFor="message">
          Deixe aqui sua depoimento, ou poste seu momento
        </Label>
        <Input
          id="message"
          placeholder="Digite aqui"
          className="w-full h-12 rounded-sm bg-background px-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAddImages(true)}
            className="mt-3 flex items-center gap-2"
          >
            <GrGallery className="text-blue-primary" size={25} />
            {!showAddImages && (
              <p className="text-xs text-text-secondary">
                Você também pode postar uma foto aqui
              </p>
            )}
          </button>

          {showAddImages && (
            <button
              onClick={handleRemovePhotos}
              className="text-text-secondary underline text-sm"
            >
              Cancelar
            </button>
          )}
        </div>

        {showAddImages && (
          <div className="flex gap-3 mt-3 overflow-x-scroll">
            {photosToUpload.map((item) => (
              <PhotoItem key={item.preview} photo={item} />
            ))}

            {photosToUpload.length <= 4 && (
              <AddPhoto onChangePhoto={handleAddPhotoToUpload}>
                <div className="w-20 h-20 rounded-sm bg-gray-200 flex flex-col items-center justify-center">
                  <p className="text-xs text-center text-text-secondary">
                    Toque para adicionar
                  </p>
                </div>
              </AddPhoto>
            )}
          </div>
        )}
        <div className="flex w-full justify-end mt-3">
          <button
            className="h-10 w-24 flex items-center justify-center rounded-sm text-white bg-blue-primary font-semibold hover:cursor-pointer disabled:cursor-default disabled:opacity-50"
            disabled={
              isLoading || (!message.trim() && photosToUpload.length === 0)
            }
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
