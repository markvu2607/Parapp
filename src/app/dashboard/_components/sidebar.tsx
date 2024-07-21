import { SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { FC } from "react";

import { SettingIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import UserService from "@/services/user.service";
import { DocumentManagement } from "./document-management";

type Props = {};

export const Sidebar: FC<Props> = async (props) => {
  const { userId } = auth();
  const id = await UserService.getUserByClerkId(userId!);
  const supabase = createClient();
  if (!id) {
    return null;
  }
  const documents = await supabase.from("documents").select().eq("user_id", id);

  return (
    <aside className="flex flex-col h-full">
      <div className="py-6">
        <h2 className="text-2xl font-bold text-center">Parapp</h2>
      </div>
      <div className="flex-1">
        <DocumentManagement documents={documents.data!} />
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
    </aside>
  );
};
