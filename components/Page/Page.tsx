import { ReactNode } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

interface Props {
  children: ReactNode;
}
export function Page({ children }: Props) {
  return (
    <div className="flex flex-col w-screen h-[100dvh]">
      <Header />
      <main className="flex flex-col container mx-auto flex-1 p-5 gap-5 max-w-[500px] mt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
