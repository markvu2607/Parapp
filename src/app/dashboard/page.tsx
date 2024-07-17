import { SignedIn, UserButton } from "@clerk/nextjs";
import { FC } from "react";

import { SettingIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DocumentList } from "./_components/document-list";
import { createClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import UserService from "@/services/user.service";

type Props = {};

const DashboardPage: FC<Props> = async () => {
  const { userId } = auth();
  const id = await UserService.getUserByClerkId(userId!);
  const supabase = createClient();
  if (!id) {
    return null;
  }
  const documents = await supabase.from("documents").select().eq("user_id", id);

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
            <DocumentList documents={documents.data!} />
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
