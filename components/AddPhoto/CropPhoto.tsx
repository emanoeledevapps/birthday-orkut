import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import { Button } from "../ui/button";
import { PhotoProps } from "./AddPhoto";

interface Props {
  fileToCrop?: File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photoCropped: (photo: PhotoProps) => void;
}

export function CropPhoto({
  fileToCrop,
  onOpenChange,
  open,
  photoCropped,
}: Props) {
  const imagePreview = fileToCrop ? URL.createObjectURL(fileToCrop) : "";

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [croppedImage, setCroppedImage] = useState(null);

  function onCropComplete(_croppedArea: Area, croppedAreaPixels: Area) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function handleGetCroppedImage() {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(
        imagePreview,
        croppedAreaPixels,
        0
      );

      if (croppedImage) {
        photoCropped({
          file: croppedImage.blob,
          preview: croppedImage.url,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cortar imagem</DialogTitle>
        </DialogHeader>

        <div className="relative flex w-[300px] h-[300px]">
          <Cropper
            image={imagePreview}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <Button onClick={handleGetCroppedImage}>Continuar</Button>
      </DialogContent>
    </Dialog>
  );
}
