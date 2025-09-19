import Image from "next/image";

import LogoImg from "@/public/assets/images/logo.png";

export function Footer() {
  return (
    <footer className="flex items-center justify-center">
      <Image width={140} height={50} alt="Logo" src={LogoImg} />
    </footer>
  );
}
