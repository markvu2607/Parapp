import { SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FC } from "react";

import { ArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";

type Props = {};

const MarketingPage: FC<Props> = () => {
  const { userId } = auth();

  if (userId) redirect("/dashboard");

  return (
    <main>
      <div className="flex justify-center fixed top-0 left-0 right-0 bg-background">
        <div className="w-full max-w-[1200px] h-[100px] flex justify-between items-center">
          <Image src="/logo.jpeg" width={40} height={40} alt="logo" />
          <SignedOut>
            <SignInButton>
              <Button className="flex justify-center gap-x-2">
                <h3>Get Parapp free</h3>
                <ArrowRight className="size-4 svg-animate" />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-full max-w-[500px]">
          <h1 className="text-3xl font-bold text-center">Welcome to Parapp</h1>
          <h3 className="text-muted-foreground text-center mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            deserunt error quibusdam quae voluptatum fuga, qui consectetur in
            molestiae blanditiis nemo fugit ex dolore natus. Voluptas
            necessitatibus fugit temporibus ipsam!
          </h3>
        </div>
      </div>
    </main>
  );
};

export default MarketingPage;
