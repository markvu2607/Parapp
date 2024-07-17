"use client";

import { FC } from "react";

import { Tables } from "@/types";

type Props = {
  document: Tables<"documents">;
};

export const DocumentItem: FC<Props> = ({ document }) => {
  return <div className="underline">{document.title}</div>;
};
