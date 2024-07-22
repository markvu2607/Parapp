"use client";

import { FC } from "react";

import { SettingIcon } from "@/components/icons";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Props = {};

export const Setting: FC<Props> = (props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex-1 gap-1">
          <SettingIcon className="size-4" />
          <p>Settings</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize how Parapp works on your device.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="appearance" className="text-right">
              Appearance
            </Label>
            <ModeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
