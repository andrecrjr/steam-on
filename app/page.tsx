import HeroBanner from "@/components/Herobanner";
import Image from "next/image";

export default function Home() {
  return (
    <main 
      className="flex  flex-col items-center justify-between md:p-24">
       <HeroBanner />
    </main>
  );
}
