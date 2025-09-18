import Image from "next/image";

interface Props {
  imageUrl?: string;
  size?: number;
  name: string;
}
export function Avatar({ imageUrl, name, size = 50 }: Props) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 rounded-full relative`}
      style={{ width: size, height: size }}
    >
      <p className="font-bold text-3xl text-text-secondary">
        {name[0].toUpperCase()}
      </p>

      {imageUrl && (
        <Image
          width={size}
          height={size}
          className="rounded-full absolute"
          alt="Image profile"
          src={imageUrl}
        />
      )}
    </div>
  );
}
