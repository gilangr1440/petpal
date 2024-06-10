import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import dog from "/assets/happy-dog-banner.png";

const Hero = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-4">
        <h1 className="text-2xl lg:text-4xl font-semibold text-center lg:text-start text-white">Kesehatan dan Kebahagiaan untuk Sahabat Setia Anda</h1>
        <Link to={"/"} className={buttonVariants({ variant: "outline" })}>
          Get Your Treat
        </Link>
      </main>
      <main>
        <img src={dog} alt="" />
      </main>
    </>
  );
};

export default Hero;
