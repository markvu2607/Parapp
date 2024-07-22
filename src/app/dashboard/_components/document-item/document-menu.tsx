"use client";

import { FC } from "react";

import { EditIcon, MoreIcon, TrashIcon } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  onRename: () => void;
  onConfirmDelete: () => void;
};

export const DocumentMenu: FC<Props> = ({ onRename, onConfirmDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-0 border-none group-hover/item:size-6 bg-inherit hover:bg-gray-300 focus-visible:ring-transparent focus-visible:ring-offset-0"
        >
          <MoreIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-x-2" onClick={onRename}>
            <EditIcon className="size-4" />
            <span>Rename</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="gap-x-2"
                onSelect={(event) => event.preventDefault()}
              >
                <TrashIcon className="size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirmDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
