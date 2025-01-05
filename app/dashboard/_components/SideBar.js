// ------------------------ Sidebar Component ----------------------------------------
// This component renders the sidebar for the application.
// It includes navigation links, an upload slide dialog, and branding with the logo.

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bluetooth, GitGraphIcon, Layout, LayoutDashboardIcon, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadSlideDialog from "./UploadSlideDialog";
import Link from "next/link";

/**
 * SideBar Component
 * Provides the application's main navigation links and utility options, such as uploading lecture slides.
 * Features:
 * - Application logo with a link to the dashboard.
 * - Upload Slide Dialog button.
 * - Learning Hub navigation link.
 * 
 * Unused sections like progress tracking or additional features are commented for future development.
 */
function SideBar () {
  return (
    <div className="shadow-md h-screen p-7">
      <Link href='/dashboard'>
        <Image src="/logo.png" width={170} height={170} alt="logo"/>
      </Link>
      <div className="mt-10">
        <UploadSlideDialog>
          <Button variant="gradient" className="w-full">+ Upload Lecture Slide</Button>
        </UploadSlideDialog>
        <div className="flex gap-2 items-center p-2 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
            <LayoutDashboardIcon />
            <h2>Your Learning Hub</h2>
        </div>
        {/* <div className="flex gap-2 items-center p-2 mt-2 hover:bg-slate-100 rounded-lg cursor-pointer">
            <GitGraphIcon />
            <h2>Knowledge Graph</h2>
        </div> */}

        {/* <div className="flex gap-2 items-center p-2 mt-2 hover:bg-slate-100 rounded-lg cursor-pointer">
            <Shield />
            <h2>Upgrade</h2>
        </div> */}
      </div>
      {/* Progress bar under development */}
      {/* <div className="absolute bottom-20 w-[80%]">
        <Progress value={20} />
        <p className="text-sm mt-2">1 out of 5 slides uploaded ✨</p>
        <p className="text-xs text-gray-400 mt-1">Upgrade to make more notes</p>
      </div> */}
    </div>
  );
}

export default SideBar;