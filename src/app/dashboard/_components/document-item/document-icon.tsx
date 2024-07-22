"use client";

import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { FC } from "react";

import { FileIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/types";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Props = {
  document: Tables<"documents">;
  onChangeIcon: (emojiData: EmojiClickData) => void;
};

export const DocumentIcon: FC<Props> = ({ document, onChangeIcon }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-6 border-none bg-inherit hover:bg-gray-300"
        >
          {document.icon ? document.icon : <FileIcon className="size-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          side="right"
          align="start"
          className="p-0 border-none"
        >
          <DropdownMenuItem className="p-0">
            <EmojiPicker
              onEmojiClick={onChangeIcon}
              skinTonesDisabled
              searchDisabled
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
