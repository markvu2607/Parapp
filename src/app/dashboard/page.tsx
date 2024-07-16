import { SignedIn, UserButton } from "@clerk/nextjs";
import { FC } from "react";

import { SettingIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type Props = {};

const DashboardPage: FC<Props> = () => {
  return (
    <main className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          maxSize={50}
          className="flex flex-col h-full"
        >
          <div className="py-6">
            <h2 className="text-2xl font-bold text-center">Parapp</h2>
          </div>
          <div className="flex-1">
            {/* TODO: implement menu */}
            Menu here
          </div>
          <div className="flex bg-secondary px-2 py-1">
            <Button variant="ghost" className="flex-1 gap-1">
              <SettingIcon className="size-4" />
              <p>Settings</p>
            </Button>
            <SignedIn>
              <div className="flex items-center">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>Two</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default DashboardPage;
