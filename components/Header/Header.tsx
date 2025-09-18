import Image from "next/image";

import LogoImg from "@/public/assets/images/logo.png";

export function Header() {
  return (
    <header className="w-full h-20 bg-blue-primary fixed z-20">
      <div className="container mx-auto flex items-center justify-between max-w-[500px] px-5 h-full">
        <Image width={140} height={50} alt="Logo" src={LogoImg} />
      </div>
    </header>
  );
}
