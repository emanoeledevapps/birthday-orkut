"use client";

import Image from "next/image";
import { PhotoPost } from "@/app/generated/prisma";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Props {
  photos: PhotoPost[];
}
export function Photos({ photos }: Props) {
  return (
    <Carousel>
      <CarouselContent>
        {photos.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative">
              <Image
                alt={`imagem ${index + 1} do post`}
                src={item.url}
                width={500}
                height={500}
                className={`w-full object-cover`}
              />

              {photos.length > 1 && (
                <div className="absolute top-2 right-2 bg-gray-200 py-1 px-5 rounded-full">
                  <p className="font-semibold">
                    {index + 1}/{photos.length}
                  </p>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
