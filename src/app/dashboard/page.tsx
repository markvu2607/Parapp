import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { FC } from "react";

type Props = {};

const DashboardPage: FC<Props> = () => {
  return (
    <main>
      Dashboard
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
};

export default DashboardPage;
