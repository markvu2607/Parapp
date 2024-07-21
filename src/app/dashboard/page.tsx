import { FC } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "./_components/sidebar";

type Props = {};

const DashboardPage: FC<Props> = async () => {
  return (
    <main className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={50}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>Two</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default DashboardPage;
